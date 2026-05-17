import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, ShieldCheck, BookOpen, Lock } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { ReassuranceSection } from "@/components/sama/ReassuranceSection";
import heroFamily from "@/assets/hero-family.jpg";
import happyChild from "@/assets/happy-child.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "سما — رحلة التعايش مع سكري النوع الأول" },
      { name: "description", content: "منصة سما: محتوى توعوي مبسط لأهالي الأطفال المصابين حديثاً بسكري النوع الأول، بإشراف طبي." },
    ],
  }),
  component: HomePage,
});

const upcomingLessons = [
  { num: "٠١", title: "فهم المرض", desc: "ما هو سكري النوع الأول؟", duration: "٥ د", open: true },
  { num: "٠٢", title: "الإنسولين والقياس", desc: "كيف نعطي الإنسولين ونقرأ السكر.", duration: "٧ د", open: false },
  { num: "٠٣", title: "التغذية اليومية", desc: "الوجبات، الكربوهيدرات، والمناسبات.", duration: "٨ د", open: false },
  { num: "٠٤", title: "الرياضة والمدرسة", desc: "كيف ندير السكر في النشاط اليومي.", duration: "٦ د", open: false },
  { num: "٠٥", title: "الجانب النفسي", desc: "دعم الطفل والأسرة عاطفياً.", duration: "٧ د", open: false },
];

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-20 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-right">
              <span className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur border border-border px-3 py-1.5 text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                بانتظار الاعتماد الطبي
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                <span className="block">سما</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium mt-2">
                  رحلتكم نحو التعايش مع سكري النوع الأول
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-loose max-w-xl">
                منصة عربية مبسّطة، علمية، ومطمئنة — مصمَّمة خصيصاً لأهالي الأطفال المصابين حديثاً. خطوة بخطوة، بلغة سهلة، ومحتوى مراجَع من مختصين.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/lesson/$id"
                  params={{ id: "1" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
                >
                  ابدأ الدرس الأول
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  to="/path"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold hover:bg-muted transition-colors"
                >
                  استعرض مسار التعلم
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> ٥ دروس قصيرة
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" /> مجاني بالكامل
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroFamily}
                alt="عائلة سعودية تجلس بدفء مع طفلها"
                width={1536}
                height={1024}
                className="relative rounded-3xl shadow-[var(--shadow-card)] w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Reassurance */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <ReassuranceSection />
        </div>

        {/* Lessons preview */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-6">
          <header className="flex items-end justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">الدروس القادمة</h2>
              <p className="text-muted-foreground text-sm">خمسة محاور قصيرة — ابدؤوا من الأول.</p>
            </div>
            <Link to="/path" className="text-sm font-medium text-primary hover:underline">
              الخريطة الكاملة ←
            </Link>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingLessons.slice(0, 3).map((l) => (
              <article
                key={l.num}
                className={`rounded-2xl border p-5 shadow-[var(--shadow-card)] transition-all ${
                  l.open ? "border-primary/40 bg-card hover:shadow-[var(--shadow-soft)]" : "border-border bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground">{l.num}</span>
                  {l.open ? (
                    <span className="text-[10px] font-semibold rounded-full bg-success/15 text-success px-2 py-0.5">
                      متاح
                    </span>
                  ) : (
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </div>
                <h3 className="font-semibold mb-1.5">{l.title}</h3>
                <p className="text-xs text-muted-foreground leading-loose mb-4">{l.desc}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {l.duration}
                  </span>
                  {l.open && (
                    <Link
                      to="/lesson/$id"
                      params={{ id: "1" }}
                      className="font-medium text-primary hover:underline"
                    >
                      ابدأ ←
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-mint/30 to-primary-soft border border-border p-8 sm:p-12 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="space-y-4 text-right">
              <h2 className="text-2xl sm:text-3xl font-bold">ابنكم سيكبر بصحة، بإذن الله</h2>
              <p className="text-muted-foreground leading-loose">
                كل ما تحتاجونه هو خطوة أولى. ابدؤوا الدرس الأول — ٥ دقائق فقط — وستجدون أن الطريق أقل وحشة مما يبدو.
              </p>
              <Link
                to="/lesson/$id"
                params={{ id: "1" }}
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                ابدؤوا الآن
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
            <img
              src={happyChild}
              alt="طفل يجري سعيداً في حديقة"
              width={1024}
              height={1024}
              loading="lazy"
              className="rounded-2xl w-full h-auto object-cover max-h-80"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
