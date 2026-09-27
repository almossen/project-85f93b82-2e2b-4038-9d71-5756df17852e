import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import samaLogo from "@/assets/sama-home-logo-original.png.asset.json";
import type { GuideBrandBox } from "@/data/simplifiedGuideContent";

interface GuideSectionHeroProps {
  image?: string;
  alt: string;
  index: number;
  fallbackLabel?: string;
  /** يغطي الشعار القديم المطبوع داخل الصورة بشعار سما الحالي. */
  brandBox?: GuideBrandBox;
}

/**
 * Reusable hero/banner image for a section in the Simplified Guide.
 * - Full-width responsive image, soft rounded corners, soft shadow.
 * - Lazy loads, with skeleton while loading and graceful placeholder on error/missing.
 * - No text overlay (text is baked into the artwork).
 */
export function GuideSectionHero({ image, alt, index, fallbackLabel, brandBox }: GuideSectionHeroProps) {
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
        <span className={`absolute top-3 ${brandBox && brandBox.x > 50 ? "end-3" : "start-3"} z-10 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground`}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="aspect-[3/1] sm:aspect-[16/7] w-full relative [--r:1.6884] sm:[--r:1.2865]">
          {showImage && !loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/60 to-muted" />
          )}

          {showImage ? (
            <>
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
              {brandBox && <BrandOverlay box={brandBox} />}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
              <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary/40" strokeWidth={1.5} />
              <p className="text-xs sm:text-sm text-foreground/70 font-medium max-w-md leading-relaxed">
                {fallbackLabel ?? alt}
              </p>
              <span className="text-sm text-muted-foreground/80">صورة توضيحية — قريبًا</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * يغطي الشعار القديم المطبوع داخل الصورة بشعار سما الحالي دون تعديل البكسلات.
 * الصورة معروضة بـ object-cover داخل حاوية أعرض منها (3:1 أو 16:7 مقابل 16:9)،
 * فالقص رأسي ومتمركز: y_container = 50% + (y_image − 50%) × r
 * حيث r = نسبة الحاوية ÷ نسبة الصورة (‎--r‎ لكل مقاس). نحصر الغطاء في الجزء
 * الظاهر حتى يبقى الشعار الجديد كاملًا غير مقصوص.
 */
function BrandOverlay({ box }: { box: GuideBrandBox }) {
  const top = `max(0%, calc(50% + (${box.y}% - 50%) * var(--r)))`;
  const bottom = `min(100%, calc(50% + (${box.y + box.h}% - 50%) * var(--r)))`;
  return (
    <div
      aria-hidden
      className="absolute flex items-center justify-center rounded-lg bg-background print:shadow-none"
      style={{
        right: `${100 - box.x - box.w}%`,
        width: `${box.w}%`,
        top,
        height: `calc(${bottom} - ${top})`,
      }}
    >
      <img
        src={samaLogo.url}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-square h-[82%] max-w-[88%] rounded-md object-contain"
      />
    </div>
  );
}
