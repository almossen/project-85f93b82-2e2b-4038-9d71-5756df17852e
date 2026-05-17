import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";

export function AudioLesson() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurrent(a.currentTime);
      setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    };
    const onLoaded = () => setDuration(a.duration || 0);
    const onEnded = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  };

  const restart = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play();
    setPlaying(true);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  return (
    <section
      id="audio-lesson"
      className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary-soft to-mint/20 p-6 sm:p-8 space-y-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-primary/15 text-primary px-3 py-1">
            <Volume2 className="h-3.5 w-3.5" />
            استمع للدرس
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">ابدأ الدرس صوتياً</h2>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            تستطيع الاستماع لشرح الدرس كاملاً بصوت هادئ ومريح، مناسب أثناء التنقّل أو لمن يفضّل الاستماع على القراءة.
          </p>
        </div>
        <div className="text-xs font-medium text-muted-foreground tabular-nums">
          {fmt(current)} / {fmt(duration)}
        </div>
      </div>

      <audio ref={audioRef} src="/audio/lesson-1.wav" preload="metadata" />

      <div className="h-2 rounded-full bg-card/70 overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
          aria-label={playing ? "إيقاف" : "تشغيل"}
        >
          {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
          {playing ? "إيقاف" : "تشغيل الدرس"}
        </button>
        <button
          type="button"
          onClick={restart}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
          aria-label="إعادة التشغيل"
        >
          <RotateCcw className="h-4 w-4" />
          إعادة
        </button>
      </div>
    </section>
  );
}
