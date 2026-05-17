import { Volume2 } from "lucide-react";

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
          aria-label="استمع للنسخة المبسطة"
        >
          <Volume2 className="h-4 w-4" />
          استمع للدرس
        </button>
      </div>
      <ul className="space-y-2.5 text-base leading-loose">
        <li className="flex gap-3">
          <span className="text-mint-foreground font-bold">•</span>
          <span>ابنك مصاب بشيء اسمه <strong>سكري النوع الأول</strong>. ليس بسببكم، وليس بسبب أكله.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-mint-foreground font-bold">•</span>
          <span>في جسمه عضو صغير اسمه <strong>البنكرياس</strong> توقّف عن صنع مادة اسمها <strong>الإنسولين</strong>.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-mint-foreground font-bold">•</span>
          <span>الإنسولين يساعد الطعام أن يصير طاقة. لذلك سنعطيه إياه عبر إبرة صغيرة كل يوم.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-mint-foreground font-bold">•</span>
          <span>ابنك <strong>سيكبر بصحة</strong>، سيلعب، سيدرس، سيسافر — كل شيء بإذن الله.</span>
        </li>
      </ul>
    </section>
  );
}
