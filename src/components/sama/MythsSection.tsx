import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

type Myth = { claim: string; truth: boolean; explanation: string };

const myths: Myth[] = [
  {
    claim: "ابني أصيب بالسكري لأنه أكل حلوى كثيرة.",
    truth: false,
    explanation: "سكري النوع الأول ليس سببه السكر أو الأكل، بل توقّف البنكرياس عن إنتاج الإنسولين لأسباب مناعية.",
  },
  {
    claim: "ابني لن يستطيع ممارسة الرياضة بعد اليوم.",
    truth: false,
    explanation: "الرياضة جزء مهم من حياته الصحية، وكثير من الرياضيين العالميين مصابون بالنوع الأول.",
  },
  {
    claim: "سيحتاج ابني إلى الإنسولين طوال حياته.",
    truth: true,
    explanation: "نعم، لأن البنكرياس لا ينتج إنسولين، لكن مع التطور الطبي أصبح أسهل وأكثر دقة.",
  },
  {
    claim: "السكري معدٍ، ويجب عزل ابني عن أصدقائه.",
    truth: false,
    explanation: "السكري ليس مرضاً معدياً مطلقاً، ولا يجب عزل الطفل اجتماعياً.",
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
            <span className="text-xs font-medium text-muted-foreground">معتقد شائع #{idx + 1}</span>
            <RotateCcw className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-base leading-loose">«{myth.claim}»</p>
          <p className="text-xs text-primary mt-3 font-medium">اضغط لمعرفة الإجابة ←</p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            {myth.truth ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success px-2.5 py-1 text-xs font-semibold">
                <Check className="h-3.5 w-3.5" /> صحيح
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 text-destructive px-2.5 py-1 text-xs font-semibold">
                <X className="h-3.5 w-3.5" /> غير صحيح
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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">معتقدات شائعة — صح أم خطأ؟</h2>
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
