import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

interface GuideSectionHeroProps {
  image?: string;
  alt: string;
  index: number;
  fallbackLabel?: string;
}

/**
 * Reusable hero/banner image for a section in the Simplified Guide.
 * - Full-width responsive image, soft rounded corners, soft shadow.
 * - Lazy loads, with skeleton while loading and graceful placeholder on error/missing.
 * - No text overlay (text is baked into the artwork).
 */
export function GuideSectionHero({ image, alt, index, fallbackLabel }: GuideSectionHeroProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // If the image was already cached and finished loading before React
  // attached the onLoad handler, sync state from the DOM ref.
  useEffect(() => {
    if (!image) return;
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [image]);

  const showImage = image && !errored;

  return (
    <div className="px-4 sm:px-6 pt-4 sm:pt-6">
      <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border/60 bg-gradient-to-br from-primary-soft via-mint/20 to-sand shadow-[var(--shadow-card)]">
        <span className="absolute top-3 start-3 z-10 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="aspect-[16/8] sm:aspect-[16/7] w-full relative">
          {showImage && !loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/60 to-muted" />
          )}

          {showImage ? (
            <img
              ref={imgRef}
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setErrored(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
              <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary/40" strokeWidth={1.5} />
              <p className="text-xs sm:text-sm text-foreground/70 font-medium max-w-md leading-relaxed">
                {fallbackLabel ?? alt}
              </p>
              <span className="text-[10px] text-muted-foreground/80">صورة توضيحية — قريبًا</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
