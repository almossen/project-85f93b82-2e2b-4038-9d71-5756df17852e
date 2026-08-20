import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-center space-y-3">
        <p className="mx-auto max-w-[80ch] text-sm font-medium text-foreground">
          منصة سما — محتوى توعوي لأهالي الأطفال المصابين بالسكري من النوع الأول
        </p>
        <p className="mx-auto max-w-[80ch] text-xs text-muted-foreground">
          محتوى تثقيفي تمت مراجعته طبيًا، ويستمر تحديثه وتحسينه عند الحاجة.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <Link
            to="/about"
            className="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            عن المنصة والمصادر وأرقام الطوارئ
          </Link>
          <span className="text-muted-foreground/50" aria-hidden="true">
            ·
          </span>
          <Link
            to="/privacy"
            className="inline-flex min-h-11 items-center px-1 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            سياسة الخصوصية
          </Link>
        </div>
        <p className="mx-auto max-w-[80ch] text-sm text-muted-foreground/80">
          آخر تحديث للمنصة: أغسطس ٢٠٢٦ — هذا المحتوى لا يغني عن استشارة الفريق الطبي المعالج.
        </p>
      </div>
    </footer>
  );
}
