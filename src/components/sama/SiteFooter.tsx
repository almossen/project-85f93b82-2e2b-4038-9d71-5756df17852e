import { Phone } from "lucide-react";

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
          <a
            href="tel:997"
            className="inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-3 min-h-11 text-sm font-bold text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            اتصال بالإسعاف 997
          </a>
        </div>
        <p className="text-[11px] text-muted-foreground/80">
          آخر تحديث للمحتوى: يوليو ٢٠٢٦ — هذا المحتوى لا يغني عن استشارة الفريق الطبي المعالج.
        </p>
      </div>
    </footer>
  );
}
