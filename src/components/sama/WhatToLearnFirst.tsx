import { Syringe, Activity, ArrowDownCircle, ArrowUpCircle, Sun } from "lucide-react";

const cards = [
  {
    icon: Syringe,
    title: "١. الإنسولين",
    text: "لماذا يحتاجه الطفل؟ ومتى يُستخدم؟",
    tint: "bg-primary-soft text-primary",
  },
  {
    icon: Activity,
    title: "٢. قياس السكر",
    text: "كيف نعرف أن السكر منخفض أو مرتفع؟",
    tint: "bg-mint/40 text-mint-foreground",
  },
  {
    icon: ArrowDownCircle,
    title: "٣. انخفاض السكر",
    text: "كيف نتصرف بسرعة وبهدوء؟",
    tint: "bg-destructive/10 text-destructive",
  },
  {
    icon: ArrowUpCircle,
    title: "٤. ارتفاع السكر",
    text: "متى نراقب؟ ومتى نتواصل مع الطبيب؟",
    tint: "bg-warning/20 text-warning-foreground",
  },
  {
    icon: Sun,
    title: "٥. الحياة اليومية",
    text: "المدرسة، اللعب، النوم، السفر، والوجبات.",
    tint: "bg-sand text-sand-foreground",
  },
];

export function WhatToLearnFirst() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">ما الذي نحتاج أن نتعلمه أولاً؟</h2>
        <p className="text-muted-foreground leading-loose">
          خمسة محاور أساسية كافية لتمكينكم من إدارة الأيام الأولى بثقة، ونتدرّج معكم في باقي الدروس.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <article
            key={c.title}
            className="rounded-2xl border border-border bg-card p-5 text-right shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${c.tint}`}>
              <c.icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <h3 className="font-semibold mb-1.5">{c.title}</h3>
            <p className="text-xs text-muted-foreground leading-loose">{c.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
