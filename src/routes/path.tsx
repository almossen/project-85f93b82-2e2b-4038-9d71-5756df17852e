import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Syringe, Apple, Activity, Brain, Lock, Check, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";

export const Route = createFileRoute("/path")({
  head: () => ({
    meta: [
      { title: "مسار التعلم — سما" },
      { name: "description", content: "خريطة مسار التعلم في منصة سما — ٥ محطات تأخذ الأهل من الفهم إلى الثقة." },
    ],
  }),
  component: PathPage,
});

type Status = "done" | "active" | "locked";

const stations: Array<{
  num: string;
  title: string;
  desc: string;
  duration: string;
  icon: React.ElementType;
  status: Status;
}> = [
  { num: "٠١", title: "فهم المرض", desc: "ما هو سكري النوع الأول، ولماذا حدث لابننا؟", duration: "٥ د", icon: BookOpen, status: "active" },
  { num: "٠٢", title: "الإنسولين والقياس", desc: "أنواع الإنسولين، طريقة الحقن، قراءة الجهاز.", duration: "٧ د", icon: Syringe, status: "locked" },
  { num: "٠٣", title: "التغذية اليومية", desc: "حساب الكربوهيدرات، الوجبات، والمناسبات.", duration: "٨ د", icon: Apple, status: "locked" },
  { num: "٠٤", title: "الرياضة والمدرسة", desc: "إدارة السكر أثناء النشاط اليومي.", duration: "٦ د", icon: Activity, status: "locked" },
  { num: "٠٥", title: "الجانب النفسي", desc: "دعم الطفل والأسرة عاطفياً واجتماعياً.", duration: "٧ د", icon: Brain, status: "locked" },
];

function StationCard({ s, idx }: { s: typeof stations[number]; idx: number }) {
  const isLeft = idx % 2 === 0;
  return (
    <div className={`grid md:grid-cols-2 gap-6 items-center ${isLeft ? "" : "md:[direction:ltr]"}`}>
      <div className={`${isLeft ? "md:order-1" : "md:order-2"} md:[direction:rtl]`}>
        <div
          className={`rounded-3xl p-6 sm:p-8 border shadow-[var(--shadow-card)] ${
            s.status === "active"
              ? "bg-primary-soft border-primary/40"
              : s.status === "done"
              ? "bg-mint/20 border-mint"
              : "bg-card border-border opacity-80"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                s.status === "locked" ? "bg-muted text-muted-foreground" : "bg-card text-primary shadow-sm"
              }`}
            >
              <s.icon className="h-6 w-6" strokeWidth={2} />
            </div>
            {s.status === "active" && (
              <span className="text-[10px] font-semibold rounded-full bg-primary text-primary-foreground px-2.5 py-1">
                متاح الآن
              </span>
            )}
            {s.status === "locked" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full bg-muted text-muted-foreground px-2.5 py-1">
                <Lock className="h-3 w-3" /> قريباً
              </span>
            )}
            {s.status === "done" && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full bg-success/15 text-success px-2.5 py-1">
                <Check className="h-3 w-3" /> مكتمل
              </span>
            )}
          </div>
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-muted-foreground">المحطة {s.num}</span>
            <h3 className="text-xl font-bold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-loose">{s.desc}</p>
            <p className="text-xs text-muted-foreground">⏱ {s.duration}</p>
          </div>
          {s.status === "active" && (
            <Link
              to="/lesson/$id"
              params={{ id: "1" }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ابدأ المحطة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
      <div className={`${isLeft ? "md:order-2" : "md:order-1"} md:[direction:rtl] flex items-center justify-center`}>
        <div
          className={`flex h-32 w-32 items-center justify-center rounded-full text-4xl font-bold ${
            s.status === "active"
              ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
              : s.status === "done"
              ? "bg-mint/60 text-mint-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {s.num}
        </div>
      </div>
    </div>
  );
}

function PathPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 text-center space-y-4">
          <span className="inline-block text-xs font-medium rounded-full bg-primary-soft text-primary px-3 py-1.5">
            خريطة الرحلة
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">٥ محطات نحو الثقة</h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-loose">
            رحلة تعليمية متدرّجة — تبدأ بفهم ما حدث، وتنتهي بالثقة في إدارة حياة ابنكم اليومية. كل محطة قصيرة، مبسّطة، ومراجَعة طبياً.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 relative">
          {/* center line */}
          <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-border to-muted -translate-x-1/2" aria-hidden />
          <div className="space-y-10 relative">
            {stations.map((s, i) => (
              <StationCard key={s.num} s={s} idx={i} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
