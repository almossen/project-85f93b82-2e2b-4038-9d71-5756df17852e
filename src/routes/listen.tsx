import { useCallback, useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { audioChapters, audioPlaylist, findLessonIndex } from "@/data/audioLessons";

export const Route = createFileRoute("/listen")({
  validateSearch: (search: Record<string, unknown>): { lesson?: string } =>
    typeof search.lesson === "string" ? { lesson: search.lesson } : {},
  head: () => ({
    meta: [
      { title: "استمع إلى سما — الدروس الصوتية | سما" },
      {
        name: "description",
        content:
          "دروس صوتية مبسطة عن سكري النوع الأول، يمكنك الاستماع إليها بالترتيب أو اختيار الموضوع الذي تحتاجه.",
      },
      { property: "og:title", content: "استمع إلى سما — الدروس الصوتية" },
      {
        property: "og:description",
        content:
          "دروس صوتية مبسطة عن سكري النوع الأول، استمع إليها بالترتيب أو اختر الموضوع الذي تحتاجه.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://t1d-ar.com/listen" },
      { property: "og:image", content: "https://t1d-ar.com/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "استمع إلى سما — الدروس الصوتية" },
      {
        name: "twitter:description",
        content: "دروس صوتية مبسطة عن سكري النوع الأول، بالترتيب أو حسب الموضوع.",
      },
      { name: "twitter:image", content: "https://t1d-ar.com/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/listen" }],
  }),
  component: ListenPage,
});

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

function ListenPage() {
  const { lesson: lessonParam } = Route.useSearch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [resume, setResume] = useState<{ id: string; index: number; time: number } | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const lesson = audioPlaylist[index];
  const total = audioPlaylist.length;

  /* ---------- استعادة الحالة المحفوظة (بدون تشغيل تلقائي) ---------- */
  useEffect(() => {
    try {
      const done = JSON.parse(localStorage.getItem(K_DONE) ?? "[]");
      if (Array.isArray(done)) setCompleted(done.filter((d) => typeof d === "string"));
    } catch {
      /* تجاهل البيانات غير الصالحة */
    }

    const fromParam = findLessonIndex(lessonParam);
    if (fromParam >= 0) {
      setIndex(fromParam);
      return;
    }
    const savedId = localStorage.getItem(K_LESSON);
    const savedIdx = findLessonIndex(savedId);
    if (savedIdx >= 0) {
      const t = Number(localStorage.getItem(K_TIME));
      setResume({
        id: audioPlaylist[savedIdx].id,
        index: savedIdx,
        time: isFinite(t) && t > 5 ? t : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- حفظ التقدم ---------- */
  const persist = useCallback(
    (time?: number) => {
      const l = audioPlaylist[index];
      if (!l) return;
      try {
        localStorage.setItem(K_LESSON, l.id);
        localStorage.setItem(K_TIME, String(time ?? audioRef.current?.currentTime ?? 0));
      } catch {
        /* التخزين غير متاح */
      }
    },
    [index],
  );

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

  /* ---------- تغيير الدرس: مصدر واحد فقط ---------- */
  const selectLesson = useCallback(
    (nextIndex: number, autoPlay: boolean, startAt = 0) => {
      const target = audioPlaylist[nextIndex];
      if (!target) return;
      const a = audioRef.current;
      setFinished(false);
      setError(false);
      setAutoplayBlocked(false);
      setIndex(nextIndex);
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
    },
    [],
  );

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a || !lesson) return;
    if (!a.src) {
      a.src = lesson.src;
      a.load();
    }
    if (playing) {
      a.pause();
      setPlaying(false);
      persist();
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
  }, [lesson, persist, playing]);

  const goNext = useCallback(
    (autoPlay: boolean) => {
      if (index + 1 < total) selectLesson(index + 1, autoPlay);
    },
    [index, selectLesson, total],
  );

  const goPrev = useCallback(() => {
    if (index > 0) selectLesson(index - 1, playing);
  }, [index, playing, selectLesson]);

  /* ---------- أحداث عنصر الصوت ---------- */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurrent(a.currentTime);
      const now = Date.now();
      if (now - lastSavedRef.current > 5000) {
        lastSavedRef.current = now;
        persist(a.currentTime);
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
      const currentLesson = audioPlaylist[index];
      if (currentLesson) markCompleted(currentLesson.id);
      setPlaying(false);
      if (index + 1 < total) {
        goNext(true);
      } else {
        setFinished(true);
        persist(0);
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
  }, [goNext, index, markCompleted, persist, total]);

  /* ---------- حفظ عند المغادرة + إيقاف الصوت عند ترك الصفحة ---------- */
  useEffect(() => {
    const onHide = () => persist();
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      const a = audioRef.current;
      if (a) {
        try {
          persist(a.currentTime);
        } catch {
          /* تجاهل */
        }
        a.pause();
      }
    };
  }, [persist]);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    const v = Number(e.target.value);
    setCurrent(v);
    if (a && isFinite(a.duration)) {
      a.currentTime = v;
      persist(v);
    }
  };

  const startFromBeginning = () => selectLesson(0, true);

  if (!lesson) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 sm:py-12 space-y-8">
        <audio ref={audioRef} preload="metadata" />

        {/* Hero */}
        <header className="space-y-3 text-center sm:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
            <Headphones className="h-3.5 w-3.5" />
            الدروس الصوتية
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">استمع إلى سما</h1>
          <p className="text-base text-muted-foreground leading-loose max-w-2xl">
            دروس قصيرة ومبسطة يمكنك الاستماع إليها بالترتيب، أو اختيار الموضوع الذي تحتاجه الآن.
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
            <button
              type="button"
              onClick={startFromBeginning}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 min-h-11 text-sm font-bold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Play className="h-4 w-4 fill-current" />
              ابدأ من الدرس الأول
            </button>
            {resume && (
              <button
                type="button"
                onClick={() => {
                  selectLesson(resume.index, true, resume.time);
                  setResume(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-3 min-h-11 text-sm font-bold text-primary hover:bg-primary-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <RotateCcw className="h-4 w-4" />
                تابع من حيث توقفت — {audioPlaylist[resume.index].title}
              </button>
            )}
          </div>
        </header>

        {/* المشغل */}
        <section
          aria-label="مشغل الدروس الصوتية"
          className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary-soft/70 to-mint/15 p-4 sm:p-6 space-y-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-primary">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1">
                <Volume2 className="h-3 w-3" />
                الدرس {lesson.index} من {total}
              </span>
              <span className="text-muted-foreground">{lesson.chapterTitle}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{lesson.title}</h2>
          </div>

          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/[0.06] p-3 text-sm text-destructive space-y-2">
              <p className="flex items-center gap-2 font-semibold">
                <AlertCircle className="h-4 w-4" />
                تعذر تشغيل هذا الدرس حاليًا.
              </p>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => selectLesson(index, true)}
                  className="rounded-full bg-destructive text-destructive-foreground px-4 py-2 min-h-11 text-xs font-bold"
                >
                  إعادة المحاولة
                </button>
                <button
                  type="button"
                  onClick={() => goNext(false)}
                  className="rounded-full border border-border bg-card px-4 py-2 min-h-11 text-xs font-bold text-foreground"
                >
                  اختيار درس آخر
                </button>
              </div>
            </div>
          )}

          {autoplayBlocked && !error && (
            <p className="text-sm font-semibold text-foreground/80">
              اضغط «تشغيل» لمتابعة الدرس التالي.
            </p>
          )}

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={1}
              value={Math.min(current, duration || 0)}
              onChange={onSeek}
              aria-label="شريط تقدم الدرس"
              disabled={!duration}
              className="w-full h-2 accent-primary cursor-pointer disabled:opacity-50"
            />
            <div className="flex justify-between text-xs font-medium text-muted-foreground tabular-nums">
              <span>{fmt(current)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              aria-label="الدرس السابق"
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
              onClick={() => goNext(playing)}
              disabled={index + 1 >= total}
              aria-label="الدرس التالي"
              className="inline-flex h-12 w-12 min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <SkipBack className="h-5 w-5" />
            </button>
          </div>

          {loading && (
            <p className="text-center text-xs text-muted-foreground">جاري التحميل…</p>
          )}

          {finished && (
            <div className="rounded-2xl border border-success/30 bg-success/[0.08] p-4 text-center space-y-2">
              <p className="font-bold text-foreground flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                أكملت دروس سما الصوتية
              </p>
              <button
                type="button"
                onClick={startFromBeginning}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 min-h-11 text-sm font-bold"
              >
                <RotateCcw className="h-4 w-4" />
                ابدأ من جديد
              </button>
            </div>
          )}
        </section>

        {/* قائمة الدروس */}
        <section aria-label="قائمة الدروس" className="space-y-6">
          {audioChapters.map((chapter) => (
            <div key={chapter.id} className="space-y-2">
              <h2 className="text-sm font-bold text-muted-foreground">{chapter.title}</h2>
              <ul className="rounded-2xl border border-border bg-card divide-y divide-border/60 overflow-hidden">
                {chapter.lessons.map((l) => {
                  const isCurrent = l.id === lesson.id;
                  const isDone = completed.includes(l.id);
                  return (
                    <li key={l.id}>
                      <button
                        type="button"
                        onClick={() => selectLesson(l.index - 1, false)}
                        aria-current={isCurrent ? "true" : undefined}
                        className={`w-full flex items-center gap-3 px-4 py-3 min-h-11 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                          isCurrent ? "bg-primary-soft" : "hover:bg-muted"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold tabular-nums shrink-0 ${isCurrent ? "text-primary" : "text-muted-foreground"}`}
                        >
                          {pad2(l.index)}
                        </span>
                        <span
                          className={`flex-1 text-sm font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}
                        >
                          {l.title}
                        </span>
                        <span className="text-[11px] font-semibold shrink-0">
                          {isCurrent ? (
                            <span className="text-primary">
                              {playing ? "يعمل الآن" : "الدرس الحالي"}
                            </span>
                          ) : isDone ? (
                            <span className="text-success inline-flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              تم الاستماع
                            </span>
                          ) : (
                            <span className="text-muted-foreground">غير مستمع</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        <p className="text-sm text-muted-foreground">
          تفضل القراءة؟{" "}
          <Link to="/simplified-guide" className="text-primary font-semibold underline">
            افتح الدليل المبسّط
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
