import { HeartHandshake, Sprout, Users } from "lucide-react";

const items = [
  {
    icon: HeartHandshake,
    title: "الخوف طبيعي",
    text: "من الطبيعي أن تشعر بالخوف أو الحزن أو الارتباك بعد التشخيص — هذه مشاعر إنسانية صادقة.",
  },
  {
    icon: Sprout,
    title: "التعلم تدريجي",
    text: "لا تحتاج أن تفهم كل شيء من اليوم الأول. ابدأ بالأساسيات، والتزم بتعليمات الطبيب، وتعلّم خطوة بخطوة.",
  },
  {
    icon: Users,
    title: "حياة طبيعية بإذن الله",
    text: "طفلك يستطيع أن يدرس، يلعب، يسافر، ويعيش حياة طبيعية كاملة بإذن الله.",
  },
];

export function ReassuranceSection() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">أنت لست وحدك</h2>
        <p className="text-muted-foreground leading-loose">
          المطلوب الآن أن تعرف الأساسيات، تلتزم بتعليمات الطبيب، وتتعلم خطوة بخطوة — ونحن معك في كل خطوة.
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <article
            key={it.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/40 text-mint-foreground mb-4">
              <it.icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-lg mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-loose">{it.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
