import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-center space-y-3">
        <p className="text-sm font-medium text-foreground">
          منصة سما — محتوى توعوي لأهالي الأطفال المصابين بسكري النوع الأول
        </p>
        <p className="text-xs text-muted-foreground">
          محتوى تثقيفي تمت مراجعته طبيًا، ويستمر تحديثه وتحسينه عند الحاجة.
        </p>
        <div className="flex justify-center print:hidden">
          <Link
            to="/about"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            عن المنصة والمصادر وأرقام الطوارئ
          </Link>
        </div>
        <p className="text-sm text-muted-foreground/80">
          آخر تحديث للمحتوى: يوليو ٢٠٢٦ — هذا المحتوى لا يغني عن استشارة الفريق الطبي المعالج.
        </p>
      </div>
    </footer>
  );
}
