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
    text: "لا تحتاجون إلى فهم كل شيء من اليوم الأول. ابدؤوا بالأساسيات، والتزموا بتعليمات الطبيب، وتعلّموا خطوة بخطوة.",
  },
  {
    icon: Users,
    title: "التعلم واللعب والطموح",
    text: "السكري من النوع الأول لا يمنع طفلك من التعلم واللعب والرياضة والسفر وبناء حياته وطموحاته مع الإدارة المناسبة، بإذن الله.",
  },
];

export function ReassuranceSection() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">أنت لست وحدك</h2>
        <p className="text-muted-foreground leading-loose">
          المطلوب الآن أن تعرفوا الأساسيات، وأن تلتزموا بتعليمات الطبيب، وأن تتعلّموا خطوة بخطوة — ونحن معكم في كل خطوة.
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
