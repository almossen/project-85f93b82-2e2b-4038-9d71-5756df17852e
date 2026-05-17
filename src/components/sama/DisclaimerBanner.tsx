import { Info } from "lucide-react";

export function DisclaimerBanner() {
  return (
    <div className="w-full bg-warning/15 border-b border-warning/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-warning-foreground">
        <Info className="h-4 w-4 shrink-0" />
        <p>
          <span className="font-semibold">تنبيه:</span> هذا المحتوى توعوي تثقيفي فقط ولا يُغني عن استشارة الطبيب المختص. النموذج الحالي بانتظار المراجعة والاعتماد الطبي.
        </p>
      </div>
    </div>
  );
}
