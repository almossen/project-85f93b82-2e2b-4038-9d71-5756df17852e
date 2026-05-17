import { Volume2 } from "lucide-react";

const lines = [
  "سكري النوع الأول يعني أن جسم الطفل لا يصنع الإنسولين الكافي.",
  "الإنسولين يساعد السكر يدخل الجسم ويعطيه طاقة.",
  "لذلك الطفل يحتاج إنسولين كل يوم حسب تعليمات الطبيب.",
  "المرض ليس بسبب أكل الحلويات.",
  "الأب والأم ليسوا السبب.",
  "مع القياس، والإنسولين، والمتابعة، يستطيع الطفل أن يعيش حياة طبيعية بإذن الله.",
];

export function SimplifiedVersion() {
  return (
    <section className="rounded-3xl border border-mint/50 bg-mint/15 p-6 sm:p-8 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="inline-block text-xs font-semibold rounded-full bg-mint/60 text-mint-foreground px-2.5 py-1 mb-2">
            نسخة مبسّطة
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">لمن يفضّل القراءة السهلة</h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
          aria-label="استمع للنص"
        >
          <Volume2 className="h-4 w-4" />
          استمع للنص
        </button>
      </div>
      <ul className="space-y-2.5 text-base leading-loose">
        {lines.map((l, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-mint-foreground font-bold">•</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
