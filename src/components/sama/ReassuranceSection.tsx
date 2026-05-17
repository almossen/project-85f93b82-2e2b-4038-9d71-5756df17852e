import { HeartHandshake, Sprout, Users } from "lucide-react";

const items = [
  {
    icon: HeartHandshake,
    title: "لستم وحدكم",
    text: "آلاف العائلات حول العالم تعيش هذه الرحلة، وأطفالهم يكبرون أصحاء، يدرسون، يلعبون، ويحققون أحلامهم.",
  },
  {
    icon: Sprout,
    title: "ابنك سيكبر بصحة",
    text: "بإذن الله، مع المتابعة الصحيحة، يستطيع ابنك أن يعيش حياة طبيعية تماماً — رياضة، سفر، دراسة، وكل ما يحب.",
  },
  {
    icon: Users,
    title: "فريق كامل معكم",
    text: "طبيب الغدد، أخصائي التغذية، الممرضة المثقفة، والمدرسة — جميعهم شركاء في هذه الرحلة، ولن تواجهوها وحدكم.",
  },
];

export function ReassuranceSection() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">قبل أن نبدأ… خذوا نفساً عميقاً</h2>
        <p className="text-muted-foreground">
          نعلم أن الخبر صعب، ومشاعركم الآن مزيج من القلق والحزن وكثير من الأسئلة. هذا طبيعي جداً.
        </p>
      </header>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <article
            key={it.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/40 text-mint-foreground mb-4">
              <it.icon className="h-5.5 w-5.5" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-lg mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-loose">{it.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
