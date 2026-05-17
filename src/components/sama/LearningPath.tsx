import { BookOpen, Syringe, Apple, Activity, Brain } from "lucide-react";

const steps = [
  { icon: BookOpen, title: "فهم المرض", desc: "ما هو سكري النوع الأول، ولماذا حدث؟" },
  { icon: Syringe, title: "الإنسولين والقياس", desc: "أنواع الإنسولين، كيفية الحقن، وقياس السكر." },
  { icon: Apple, title: "التغذية اليومية", desc: "حساب الكربوهيدرات، الوجبات، والمناسبات." },
  { icon: Activity, title: "الرياضة والمدرسة", desc: "كيف ندير السكر أثناء النشاط والدراسة." },
  { icon: Brain, title: "الجانب النفسي", desc: "دعم الطفل، الأسرة، والتعامل مع الأقران." },
];

export function LearningPath({ compact = false }: { compact?: boolean }) {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">محاور الرحلة التعليمية</h2>
        <p className="text-muted-foreground">
          {compact
            ? "خمسة محاور تأخذكم خطوة بخطوة من الفهم إلى الثقة."
            : "كل محور يحتوي على دروس قصيرة، مرئية، ومبسطة."}
        </p>
      </header>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl border border-border bg-card p-5 text-right shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <span className="text-xs font-bold text-muted-foreground">٠{i + 1}</span>
            </div>
            <h3 className="font-semibold mb-1.5">{s.title}</h3>
            <p className="text-xs text-muted-foreground leading-loose">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
