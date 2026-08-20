import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Headphones,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Siren,
  Users,
  Info,
} from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import {
  LESSON_COUNT,
  audioChapters,
  audioEmergencyTracks,
  audioExperienceTracks,
  findLessonIndex,
  mainPlaylist,
  type AudioTrack,
} from "@/data/audioLessons";

export const Route = createFileRoute("/listen")({
  validateSearch: (search: Record<string, unknown>): { lesson?: string } =>
    typeof search.lesson === "string" ? { lesson: search.lesson } : {},
  head: () => ({
    meta: [
      { title: "استمع إلى سما — الرحلة الصوتية | سما" },
      {
        name: "description",
        content:
          "رحلة صوتية مبسطة عن السكري من النوع الأول: مقدمة و36 درسًا بالترتيب، ومقاطع للحالات الطارئة وتجارب الأهالي.",
      },
      { property: "og:title", content: "استمع إلى سما — الرحلة الصوتية" },
      {
        property: "og:description",
        content:
          "رحلة صوتية مبسطة عن السكري من النوع الأول، استمعوا إليها بالترتيب أو اختاروا الموضوع الذي تحتاجونه.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://t1d-ar.com/listen" },
      { property: "og:image", content: "https://t1d-ar.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "استمع إلى سما — الرحلة الصوتية" },
      {
        name: "twitter:description",
        content: "رحلة صوتية مبسطة عن السكري من النوع الأول، بالترتيب أو حسب الموضوع.",
      },
      { name: "twitter:image", content: "https://t1d-ar.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/listen" }],
  }),
  component: ListenPage,
});

/* مفاتيح V1 — محفوظة كما هي حتى لا يفقد أحد تقدمه. */
const K_LESSON = "sama-audio-current-lesson";
const K_TIME = "sama-audio-current-time";
const K_DONE = "sama-audio-completed-lessons";

const fmt = (s: number) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${ss}`;
};

const pad2 = (n: number) => n.toString().padStart(2, "0");

/** المقطع الجانبي المُشغَّل حاليًا (طوارئ أو تجربة)، أو لا شيء. */
type SideTrack = { track: AudioTrack; playing: boolean } | null;

function ListenPage() {
  const { lesson: lessonParam } = Route.useSearch();

  /* عنصر الصوت الوحيد في الصفحة — كل شيء يمر من هنا. */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mainIndexRef = useRef(0);
  const sideIdRef = useRef<string | null>(null);
  const lastSavedRef = useRef(0);
  const finishedRef = useRef(false);

  const [mainIndex, setMainIndex] = useState(0);
  const [side, setSide] = useState<SideTrack>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [resume, setResume] = useState<{ id: string; index: number; time: number } | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const mainTrack = mainPlaylist[mainIndex];
  const totalMain = mainPlaylist.length; // 1 مقدمة + 36 درسًا
  const isIntro = mainTrack?.kind === "intro";
  const sideActive = side !== null;

  const doneLessons = useMemo(
    () => completed.filter((id) => id !== "sama-intro").length,
    [completed],
  );
  const percent = Math.round((doneLessons / LESSON_COUNT) * 100);

  /* ------------------------------------------ استعادة الحالة عند الفتح */
  useEffect(() => {
    try {
      const done = JSON.parse(localStorage.getItem(K_DONE) ?? "[]");
      if (Array.isArray(done)) setCompleted(done.filter((d) => typeof d === "string"));
    } catch {
      /* تجاهل البيانات غير الصالحة */
    }

    const fromParam = findLessonIndex(lessonParam);
    if (fromParam >= 0) {
      mainIndexRef.current = fromParam;
      setMainIndex(fromParam);
      return;
    }
    const savedId = localStorage.getItem(K_LESSON);
    const savedIdx = mainPlaylist.findIndex((t) => t.id === savedId);
    if (savedIdx >= 0) {
      const t = Number(localStorage.getItem(K_TIME));
      setResume({
        id: mainPlaylist[savedIdx].id,
        index: savedIdx,
        time: isFinite(t) && t > 5 ? t : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ------------------------------------ حفظ موضع الرحلة الرئيسية فقط */
  const persistMain = useCallback((time?: number) => {
    if (finishedRef.current) return;
    if (sideIdRef.current) return; // لا نحفظ موضع مقطع جانبي في تقدم الرحلة
    const t = mainPlaylist[mainIndexRef.current];
    if (!t) return;
    try {
      localStorage.setItem(K_LESSON, t.id);
      localStorage.setItem(K_TIME, String(time ?? audioRef.current?.currentTime ?? 0));
    } catch {
      /* التخزين غير متاح */
    }
  }, []);

  const markJourneyFinished = useCallback(() => {
    finishedRef.current = true;
    setFinished(true);
    setResume(null);
    try {
      localStorage.removeItem(K_LESSON);
      localStorage.removeItem(K_TIME);
    } catch {
      /* التخزين غير متاح */
    }
  }, []);

  const markCompleted = useCallback((id: string) => {
    setCompleted((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(K_DONE, JSON.stringify(next));
      } catch {
        /* التخزين غير متاح */
      }
      return next;
    });
  }, []);

  /* -------------------------------- تشغيل مقطع من الرحلة الرئيسية */
  const selectMain = useCallback((nextIndex: number, autoPlay: boolean, startAt = 0) => {
    const target = mainPlaylist[nextIndex];
    if (!target) return;
    const a = audioRef.current;
    finishedRef.current = false;
    mainIndexRef.current = nextIndex;
    sideIdRef.current = null;
    setSide(null);
    setFinished(false);
    setError(false);
    setAutoplayBlocked(false);
    setMainIndex(nextIndex);
    setCurrent(startAt);
    setDuration(0);
    if (!a) return;
    a.pause();
    a.src = target.src;
    a.load();
    const applyStart = () => {
      if (startAt > 0) {
        try {
          a.currentTime = startAt;
        } catch {
          /* لا يمكن التقديم قبل تحميل الميتاداتا */
        }
      }
    };
    a.addEventListener("loadedmetadata", applyStart, { once: true });
    if (autoPlay) {
      setLoading(true);
      a.play()
        .then(() => {
          setPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          setPlaying(false);
          setAutoplayBlocked(true);
        })
        .finally(() => setLoading(false));
    } else {
      setPlaying(false);
    }
    try {
      localStorage.setItem(K_LESSON, target.id);
      localStorage.setItem(K_TIME, String(startAt));
    } catch {
      /* التخزين غير متاح */
    }
  }, []);

  /* ------------- تشغيل مقطع جانبي: يوقف الدرس دون مسح موضع الاستكمال */
  const playSide = useCallback(
    (track: AudioTrack) => {
      const a = audioRef.current;
      if (!a) return;
      // إن كان درس الرحلة يعمل الآن، احفظ موضعه أولًا ثم أوقفه.
      if (!sideIdRef.current) persistMain(a.currentTime);
      a.pause();
      // إعادة الضغط على نفس المقطع = إيقاف مؤقت / استئناف
      if (sideIdRef.current === track.id) {
        if (side?.playing) {
          setSide({ track, playing: false });
          setPlaying(false);
          return;
        }
        setLoading(true);
        a.play()
          .then(() => {
            setSide({ track, playing: true });
            setPlaying(true);
          })
          .catch(() => setError(true))
          .finally(() => setLoading(false));
        return;
      }
      sideIdRef.current = track.id;
      setSide({ track, playing: false });
      setError(false);
      setAutoplayBlocked(false);
      setCurrent(0);
      setDuration(0);
      a.src = track.src;
      a.load();
      setLoading(true);
      a.play()
        .then(() => {
          setSide({ track, playing: true });
          setPlaying(true);
        })
        .catch(() => {
          setSide({ track, playing: false });
          setPlaying(false);
          setError(true);
        })
        .finally(() => setLoading(false));
    },
    [persistMain, side],
  );

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (sideActive && side) {
      playSide(side.track);
      return;
    }
    if (!mainTrack) return;
    if (!a.src) {
      a.src = mainTrack.src;
      a.load();
    }
    if (playing) {
      a.pause();
      setPlaying(false);
      persistMain();
      return;
    }
    setLoading(true);
    setError(false);
    a.play()
      .then(() => {
        setPlaying(true);
        setAutoplayBlocked(false);
        setFinished(false);
      })
      .catch(() => {
        setPlaying(false);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [mainTrack, persistMain, playSide, playing, side, sideActive]);

  const goNext = useCallback(
    (autoPlay: boolean) => {
      if (mainIndex + 1 < totalMain) selectMain(mainIndex + 1, autoPlay);
    },
    [mainIndex, selectMain, totalMain],
  );

  const goPrev = useCallback(() => {
    if (mainIndex > 0) selectMain(mainIndex - 1, playing && !sideActive);
  }, [mainIndex, playing, selectMain, sideActive]);

  /* ------------------------------------------------ أحداث عنصر الصوت */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurrent(a.currentTime);
      if (sideIdRef.current) return; // المقاطع الجانبية لا تُحفظ في التقدم
      const now = Date.now();
      if (now - lastSavedRef.current > 5000) {
        lastSavedRef.current = now;
        persistMain(a.currentTime);
      }
    };
    const onLoaded = () => {
      setDuration(a.duration || 0);
      setError(false);
    };
    const onError = () => {
      setError(true);
      setPlaying(false);
      setLoading(false);
    };
    const onEnded = () => {
      setPlaying(false);
      // مقطع جانبي: يتوقف عند نهايته ولا يشغّل شيئًا بعده.
      if (sideIdRef.current) {
        setSide((s) => (s ? { ...s, playing: false } : null));
        return;
      }
      const t = mainPlaylist[mainIndex];
      if (t && t.kind === "lesson") markCompleted(t.id);
      if (mainIndex + 1 < totalMain) {
        goNext(true);
      } else {
        markJourneyFinished();
      }
    };
    const onWaiting = () => setLoading(true);
    const onPlaying = () => setLoading(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("error", onError);
    a.addEventListener("ended", onEnded);
    a.addEventListener("waiting", onWaiting);
    a.addEventListener("playing", onPlaying);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("error", onError);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("waiting", onWaiting);
      a.removeEventListener("playing", onPlaying);
    };
  }, [goNext, mainIndex, markCompleted, markJourneyFinished, persistMain, totalMain]);

  /* ------------------- إيقاف الصوت وحفظ موضع الرحلة عند مغادرة الصفحة */
  useEffect(() => {
    const audioEl = audioRef.current;
    const onHide = () => persistMain();
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      if (audioEl) {
        try {
          if (!sideIdRef.current) persistMain(audioEl.currentTime);
        } catch {
          /* تجاهل */
        }
        audioEl.pause();
      }
    };
    // يعمل مرة واحدة: الإيقاف عند مغادرة الصفحة، لا عند تغيير المقطع
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    const v = Number(e.target.value);
    setCurrent(v);
    if (a && isFinite(a.duration)) {
      a.currentTime = v;
      if (!sideIdRef.current) persistMain(v);
    }
  };

  const startFromBeginning = () => selectMain(0, true);

  const nowPlayingTitle = sideActive && side ? side.track.title : mainTrack?.title;
  const nowPlayingLabel = sideActive
    ? side?.track.kind === "emergency"
      ? "حالة طارئة"
      : "تجربة أهل"
    : isIntro
      ? "مقدمة"
      : `الدرس ${mainTrack && mainTrack.kind === "lesson" ? mainTrack.lessonIndex : 1} من ${LESSON_COUNT}`;

  if (!mainTrack) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-12 space-y-10">
        {/* عنصر الصوت الوحيد في الصفحة */}
        <audio ref={audioRef} preload="metadata" />

        {/* Hero */}
        <header className="space-y-3 text-center sm:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
            <Headphones className="h-3.5 w-3.5" />
            الرحلة الصوتية
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">استمع إلى سما</h1>
          <p className="text-base text-muted-foreground leading-loose max-w-2xl">
            دروس قصيرة ومبسطة يمكنكم الاستماع إليها بالترتيب، أو اختيار الموضوع الذي تحتاجونه الآن.
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
            <button
              type="button"
              onClick={startFromBeginning}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 min-h-11 text-sm font-bold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Play className="h-4 w-4 fill-current" />
              ابدأ الرحلة من البداية
            </button>
            {resume && (
              <button
                type="button"
                onClick={() => {
                  selectMain(resume.index, true, resume.time);
                  setResume(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-3 min-h-11 text-sm font-bold text-primary hover:bg-primary-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-4 w-4" />
                تابع من حيث توقفتم — {mainPlaylist[resume.index].title}
              </button>
            )}
          </div>
          {doneLessons > 0 && (
            <p className="text-xs font-semibold text-muted-foreground tabular-nums">
              أكملتم {doneLessons} من {LESSON_COUNT} درسًا · {percent}%
            </p>
          )}
        </header>

        {/* المشغل — يبقى بعرض قراءة مركزي ولا يتمدد مع اتساع الحاوية */}
        <section
          aria-label="مشغل الرحلة الصوتية"
          className="mx-auto w-full max-w-3xl rounded-3xl border border-primary/25 bg-gradient-to-br from-primary-soft/70 to-mint/15 p-4 sm:p-6 space-y-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-primary">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1">
                <Volume2 className="h-3 w-3" />
                {nowPlayingLabel}
              </span>
              {!sideActive && !isIntro && mainTrack.kind === "lesson" && (
                <span className="text-muted-foreground">{mainTrack.chapterTitle}</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{nowPlayingTitle}</h2>
          </div>

          {sideActive && (
            <p className="text-xs text-muted-foreground">
              هذا المقطع خارج ترتيب الرحلة، ولن ينتقل تلقائيًا إلى غيره. موضعكم في الرحلة محفوظ.
            </p>
          )}

          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-3 text-sm text-destructive space-y-2">
              <p className="flex items-center gap-2 font-semibold">
                <AlertCircle className="h-4 w-4" />
                تعذر تشغيل هذا المقطع حاليًا.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() =>
                    sideActive && side ? playSide(side.track) : selectMain(mainIndex, true)
                  }
                  className="rounded-full bg-destructive text-destructive-foreground px-4 py-2 min-h-11 text-xs font-bold"
                >
                  إعادة المحاولة
                </button>
                {!sideActive && (
                  <button
                    type="button"
                    onClick={() => goNext(false)}
                    className="rounded-full border border-border bg-card px-4 py-2 min-h-11 text-xs font-bold text-foreground"
                  >
                    اختيار درس آخر
                  </button>
                )}
              </div>
            </div>
          )}

          {autoplayBlocked && !error && (
            <p className="text-sm font-semibold text-foreground/80">
              اضغطوا «تشغيل» لمتابعة المقطع التالي.
            </p>
          )}

          <div className="space-y-2">
            {/* الغلاف يمنح منطقة لمس ~44px بينما يبقى الـrail المرئي رفيعًا (h-2).
                touch-none تمنع تمرير الصفحة أثناء السحب بالإصبع. */}
            <div className="flex min-h-11 items-center py-4 -my-4">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={1}
                value={Math.min(current, duration || 0)}
                onChange={onSeek}
                aria-label="شريط تقدم المقطع"
                disabled={!duration}
                className="w-full h-2 accent-primary cursor-pointer touch-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-muted-foreground tabular-nums">
              <span>{fmt(current)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={sideActive || mainIndex === 0}
              aria-label="المقطع السابق"
              className="inline-flex h-12 w-12 min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "إيقاف مؤقت" : "تشغيل"}
              className="inline-flex h-14 w-14 min-h-11 min-w-11 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {playing ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="h-6 w-6 fill-current" />
              )}
            </button>
            <button
              type="button"
              onClick={() => goNext(playing && !sideActive)}
              disabled={sideActive || mainIndex + 1 >= totalMain}
              aria-label="المقطع التالي"
              className="inline-flex h-12 w-12 min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SkipBack className="h-5 w-5" />
            </button>
          </div>

          {loading && <p className="text-center text-xs text-muted-foreground">جاري التحميل…</p>}

          {finished && (
            <div className="rounded-2xl border border-success/30 bg-success/[0.08] p-4 text-center space-y-2">
              <p className="font-bold text-foreground flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                أكملتم رحلة سما الصوتية
              </p>
              <button
                type="button"
                onClick={startFromBeginning}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 min-h-11 text-sm font-bold"
              >
                <RotateCcw className="h-4 w-4" />
                ابدؤوا من جديد
              </button>
            </div>
          )}
        </section>

        {/* 1. الرحلة الصوتية — المقدمة ثم الفصول */}
        <section aria-label="دروس الرحلة" className="space-y-6">
          <h2 className="text-lg font-bold text-foreground">الرحلة الصوتية</h2>

          <button
            type="button"
            onClick={() => selectMain(0, false)}
            aria-current={!sideActive && isIntro ? "true" : undefined}
            className={`w-full flex items-center gap-3 rounded-2xl border px-4 py-3 min-h-11 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              !sideActive && isIntro
                ? "border-primary/40 bg-primary-soft"
                : "border-border bg-card hover:bg-muted"
            }`}
          >
            <span
              className={`text-xs font-bold shrink-0 ${!sideActive && isIntro ? "text-primary" : "text-muted-foreground"}`}
            >
              مقدمة
            </span>
            <span
              className={`flex-1 text-sm font-semibold ${!sideActive && isIntro ? "text-primary" : "text-foreground"}`}
            >
              {mainPlaylist[0].title}
            </span>
            {!sideActive && isIntro && (
              <span className="text-[11px] font-semibold text-primary shrink-0">
                {playing ? "قيد التشغيل" : "المقطع الحالي"}
              </span>
            )}
          </button>

          {/* على الشاشات الكبيرة: عمودان من الفصول. كل فصل يبقى كتلة واحدة
              بعنوانه ودروسه، فلا ينفصل درس عن فصله ولا يتغير ترتيب القائمة. */}
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            {audioChapters.map((chapter) => (
              <div key={chapter.id} className="space-y-2">
                <h3 className="text-sm font-bold text-muted-foreground">{chapter.title}</h3>
                <ul className="rounded-2xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
                  {chapter.lessons.map((l) => {
                    const isCurrent = !sideActive && l.id === mainTrack.id;
                    const isDone = completed.includes(l.id);
                    return (
                      <li key={l.id}>
                        <button
                          type="button"
                          onClick={() => selectMain(l.lessonIndex, false)}
                          aria-current={isCurrent ? "true" : undefined}
                          className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                            isCurrent ? "bg-primary-soft" : "hover:bg-muted"
                          }`}
                        >
                          <span
                            className={`text-xs font-bold tabular-nums shrink-0 ${isCurrent ? "text-primary" : "text-muted-foreground"}`}
                          >
                            {pad2(l.lessonIndex)}
                          </span>
                          <span
                            className={`flex-1 text-sm font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}
                          >
                            {l.title}
                          </span>
                          <span className="text-[11px] font-semibold shrink-0">
                            {isCurrent ? (
                              <span className="text-primary">
                                {playing ? "قيد التشغيل" : "الدرس الحالي"}
                              </span>
                            ) : isDone ? (
                              <span className="text-success inline-flex items-center gap-1">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                تم الاستماع
                              </span>
                            ) : (
                              <span className="text-muted-foreground">لم يُستمع إليه</span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 2. ماذا أفعل الآن؟ — استمع */}
        <section aria-label="مقاطع الحالات الطارئة" className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Siren className="h-4.5 w-4.5 text-destructive" />
              ماذا أفعل الآن؟ — استمع
            </h2>
            <p className="text-sm text-muted-foreground leading-loose">
              مقاطع قصيرة لكل حالة، تبدأ مباشرة بالخطوات. لا تنتقل تلقائيًا إلى غيرها، ولا تدخل ضمن
              تقدّم الرحلة.
            </p>
          </div>
          <ul className="rounded-2xl border border-destructive/25 bg-card divide-y divide-border/60 overflow-hidden">
            {audioEmergencyTracks.map((t) => {
              const isCurrent = side?.track.id === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => playSide(t)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                      isCurrent ? "bg-destructive/[0.07]" : "hover:bg-muted"
                    }`}
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      {isCurrent && side?.playing ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current" />
                      )}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-foreground">{t.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-sm text-muted-foreground">
            الصوت لا يغني عن الخطوات المكتوبة.{" "}
            <Link to="/what-to-do-now" className="text-destructive font-semibold underline">
              افتحوا صفحة «ماذا أفعل الآن؟»
            </Link>
          </p>
        </section>

        {/* 3. تجارب الأهالي — استمع */}
        <section aria-label="مقاطع تجارب الأهالي" className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Users className="h-4.5 w-4.5 text-primary" />
              تجارب الأهالي — استمع
            </h2>
            <p className="text-sm text-muted-foreground leading-loose">
              تجارب شخصية خارج المنهج الأساسي، لا تنتقل تلقائيًا ولا تدخل ضمن تقدّم الرحلة.
            </p>
          </div>
          <ul className="rounded-2xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
            {audioExperienceTracks.map((t) => {
              const isCurrent = side?.track.id === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => playSide(t)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                      isCurrent ? "bg-primary-soft" : "hover:bg-muted"
                    }`}
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {isCurrent && side?.playing ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current" />
                      )}
                    </span>
                    <span className="flex-1 text-sm font-semibold text-foreground">{t.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="rounded-2xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground leading-loose flex gap-2">
            <Info className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <span>
              تجارب المنتجات قد تتغير مع الوقت. المعلومات الواردة في هذين المقطعين مؤرّخة، والأسعار
              والتوافق والشحن تحتاج إلى التحقق من المصدر الرسمي قبل أي قرار شراء.
            </span>
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          تفضّلون القراءة؟{" "}
          <Link to="/simplified-guide" className="text-primary font-semibold underline">
            افتحوا الدليل المبسّط
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
