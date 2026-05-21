import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Volume2, Headphones } from "lucide-react";

type Props = {
  sectionId: string;
  lessonLabel: string;
};

export function LessonAudioPlayer({ sectionId, lessonLabel }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [available, setAvailable] = useState<boolean | null>(null);

  const src = `/audio/lessons/${sectionId}.mp3`;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurrent(a.currentTime);
      setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
    };
    const onLoaded = () => {
      setDuration(a.duration || 0);
      setAvailable(true);
    };
    const onError = () => setAvailable(false);
    const onEnded = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("error", onError);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("error", onError);
      a.removeEventListener("ended", onEnded);
    };
  }, [sectionId]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a || available === false) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  };

  const restart = () => {
    const a = audioRef.current;
    if (!a || available === false) return;
    a.currentTime = 0;
    a.play().catch(() => setAvailable(false));
    setPlaying(true);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  const unavailable = available === false;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary-soft/70 to-mint/15 p-4 sm:p-5 print:hidden">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Headphones className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-[180px] space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 text-primary px-2 py-0.5 text-[11px] font-semibold">
              <Volume2 className="h-3 w-3" />
              {lessonLabel}
            </span>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {fmt(current)} / {fmt(duration)}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground/90">
            {unavailable
              ? "النسخة الصوتية لهذا الدرس ستتوفر قريبًا"
              : "استمع لشرح الدرس صوتيًا قبل القراءة"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            disabled={unavailable}
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={playing ? "إيقاف" : "تشغيل"}
          >
            {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
            {playing ? "إيقاف" : "استمع"}
          </button>
          <button
            type="button"
            onClick={restart}
            disabled={unavailable}
            className="inline-flex items-center justify-center rounded-full border border-border bg-card h-9 w-9 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="إعادة"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>
      {!unavailable && (
        <div className="h-1.5 rounded-full bg-card/80 overflow-hidden mt-3">
          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
