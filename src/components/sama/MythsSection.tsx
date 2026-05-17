import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

type Myth = { claim: string; truth: boolean; explanation: string };

const myths: Myth[] = [
  {
    claim: "سكري النوع الأول يحدث بسبب أكل الحلويات.",
    truth: false,
    explanation: "خطأ. سكري النوع الأول ليس بسبب أكل الحلويات؛ هو حالة مناعية يتوقّف فيها البنكرياس عن إنتاج الإنسولين.",
  },
  {
    claim: "الأب أو الأم هم السبب في إصابة الطفل.",
    truth: false,
    explanation: "خطأ. المرض ليس بسبب تقصير الوالدين، ولا علاقة له بطريقة التربية أو الرعاية.",
  },
  {
    claim: "الطفل المصاب يحتاج إلى الإنسولين.",
    truth: true,
    explanation: "صحيح. الإنسولين علاج أساسي يحدده الطبيب، ولا يمكن للطفل الاستغناء عنه.",
  },
  {
    claim: "يمكن للطفل المصاب أن يدرس ويلعب ويعيش حياته.",
    truth: true,
    explanation: "صحيح. مع المتابعة والتعلم يستطيع الطفل أن يعيش حياة نشطة وطبيعية بإذن الله.",
  },
];

function MythCard({ myth, idx }: { myth: Myth; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="group text-right rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all min-h-[180px] flex flex-col justify-between"
      aria-label={`بطاقة معتقد رقم ${idx + 1} — اضغط لقلب البطاقة`}
    >
      {!flipped ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">بطاقة #{idx + 1}</span>
            <RotateCcw className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-base leading-loose">«{myth.claim}»</p>
          <p className="text-xs text-primary mt-3 font-medium">صح أم خطأ؟ اضغط لكشف الإجابة ←</p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            {myth.truth ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success px-2.5 py-1 text-xs font-semibold">
                <Check className="h-3.5 w-3.5" /> صح
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 text-destructive px-2.5 py-1 text-xs font-semibold">
                <X className="h-3.5 w-3.5" /> خطأ
              </span>
            )}
          </div>
          <p className="text-sm leading-loose text-foreground/90">{myth.explanation}</p>
          <p className="text-xs text-muted-foreground mt-3">اضغط للعودة</p>
        </>
      )}
    </button>
  );
}

export function MythsSection() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">معلومة مهمة: أنتم لستم السبب</h2>
        <p className="text-muted-foreground">اضغط على البطاقة لكشف الإجابة العلمية.</p>
      </header>
      <div className="grid sm:grid-cols-2 gap-4">
        {myths.map((m, i) => (
          <MythCard key={i} myth={m} idx={i} />
        ))}
      </div>
    </section>
  );
}
