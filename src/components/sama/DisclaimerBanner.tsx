import { Info, Phone } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="w-full bg-warning/15 border-b border-warning/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-warning-foreground">
        <Info className="h-4 w-4 shrink-0" />
        <p className="flex-1 min-w-[200px]">
          <span className="font-semibold">تنويه:</span> هذا المحتوى تثقيفي وداعم، تمت مراجعته طبيًا، ولا يغني عن متابعة الطبيب أو فريق السكري؛ لأن خطة العلاج تختلف من طفل لآخر. في الحالات الطارئة اتصل بالهلال الأحمر السعودي{" "}
          <a href="tel:997" className="font-bold underline">
            997
          </a>
          .
        </p>
        <a
          href="tel:997"
          className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 min-h-11 text-sm font-bold text-destructive-foreground hover:bg-destructive/90 transition-colors print:hidden"
        >
          <Phone className="h-4 w-4" strokeWidth={2.4} />
          اتصال بالإسعاف 997
        </a>
      </div>
    </div>
  );
}
