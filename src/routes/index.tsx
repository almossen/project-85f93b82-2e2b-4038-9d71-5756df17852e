import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Users,
  GraduationCap,
  Baby,
  Stethoscope,
  Languages,
  Compass,
  Siren,
  Wrench,
} from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { ReassuranceSection } from "@/components/sama/ReassuranceSection";
import heroFamily from "@/assets/sama-family.webp";
import happyChild from "@/assets/happy-child.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "سما — رحلة التعايش مع سكري النوع الأول" },
      {
        name: "description",
        content:
          "منصة سما: محتوى عربي توعوي مبسط لأهالي الأطفال المصابين حديثاً بسكري النوع الأول — من اليوم الأول للتشخيص حتى التمكّن بثقة وطمأنينة.",
      },
    ],
  }),
  component: HomePage,
});

const whySama = [
  {
    icon: Languages,
    title: "بلغة عربية مبسّطة",
    text: "محتوى مكتوب بلغة قريبة من الأسرة، بعيداً عن المصطلحات الطبية المعقدة.",
  },
  {
    icon: Stethoscope,
    title: "تمت مراجعته طبيًا",
    text: "محتوى تثقيفي تمت مراجعته من مختص، ويستمر تحديثه وتحسينه عند الحاجة.",
  },
  {
    icon: Sparkles,
    title: "خطوة بخطوة",
    text: "معلومة واحدة في كل مرة، مع طمأنة وتطبيق عملي بسيط — لا حمل زائد.",
  },
];

const audience = [
  { icon: Users, title: "أولياء الأمور", text: "خاصة الأسر التي شُخّص طفلها حديثاً." },
  { icon: Baby, title: "الأجداد والمرافقون", text: "كل من يرعى الطفل في غياب الوالدين." },
  { icon: GraduationCap, title: "المعلمون والمرشدون الصحيون", text: "للتعامل الآمن مع الطفل في المدرسة." },
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
                محتوى تثقيفي تمت مراجعته طبيًا
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                <span className="block">سما</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium mt-2">
                  رحلة التعايش مع سكري النوع الأول
                </span>
              </h1>
              <div className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                «سما» منصة عربية تثقيفية تمت مراجعتها طبيًا، تساند أسر الأطفال المشخصين حديثًا
                بسكري النوع الأول: تشرح أساسيات التعامل اليومي — الإنسولين، القياس، الهبوط
                والارتفاع، المدرسة والطوارئ — بهدوء ووضوح، خطوة بخطوة، دون أن تكون بديلًا عن
                طبيبكم أو فريق السكري.
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/simplified-guide"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
                >
                  ابدأ الدليل المبسّط
                  <ArrowLeft className="h-4 w-4" />
                </Link>
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

        {/* فرز فوري — ثلاثة مداخل واضحة حسب حاجة الأسرة الآن */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 -mt-4 sm:-mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link
              to="/simplified-guide"
              className="group rounded-3xl border border-primary/25 bg-card p-5 sm:p-6 text-right shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary mb-4">
                <Compass className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-lg mb-1">شُخّص طفلكم حديثًا؟</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                ابدؤوا من الفصل الأول — نأخذكم خطوة بخطوة من اليوم الأول.
              </p>
            </Link>

            <Link
              to="/what-to-do-now"
              className="group rounded-3xl border border-destructive/30 bg-destructive/[0.04] p-5 sm:p-6 text-right shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/12 text-destructive mb-4">
                <Siren className="h-6 w-6" strokeWidth={2.2} />
              </div>
              <h3 className="font-bold text-lg mb-1 text-destructive">عندكم موقف الآن؟</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                خطوات سريعة وواضحة للهبوط والارتفاع والكيتونات ومتى تطلبون المساعدة.
              </p>
            </Link>

            <Link
              to="/family-tools"
              className="group rounded-3xl border border-border bg-card p-5 sm:p-6 text-right shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/25 text-primary mb-4">
                <Wrench className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-lg mb-1">أدوات وقوائم جاهزة</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                رسالة للطبيب، أسئلة أول موعد، حقيبة السكري، وروتين ليلي — جاهزة للطباعة.
              </p>
            </Link>
          </div>
        </section>

        {/* Why Sama */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 space-y-8">
          <header className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">لماذا منصة سما؟</h2>
            <p className="text-muted-foreground leading-loose">
              لأن الأسرة في الأسابيع الأولى تحتاج إلى محتوى يطمئنها، ويعطيها ما تحتاجه الآن فقط، دون إغراق أو تهويل.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whySama.map((w) => (
              <article
                key={w.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-shadow text-right"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary mb-4">
                  <w.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="font-semibold mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-loose">{w.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Audience */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <div className="rounded-3xl bg-sand/40 border border-sand p-8 sm:p-10 space-y-6">
            <header className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-sand-foreground">لمن هذه المنصة؟</h2>
              <p className="text-sand-foreground/80 leading-loose">
                موجّهة لكل من يرعى طفلاً مصاباً بسكري النوع الأول، بأي مستوى تعليمي وأي خلفية.
              </p>
            </header>
            <div className="grid sm:grid-cols-3 gap-4">
              {audience.map((a) => (
                <article
                  key={a.title}
                  className="rounded-2xl bg-card border border-border p-5 text-right shadow-[var(--shadow-card)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint/40 text-mint-foreground mb-3">
                    <a.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold mb-1">{a.title}</h3>
                  <p className="text-sm text-muted-foreground leading-loose">{a.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reassurance */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <ReassuranceSection />
        </div>

        {/* Closing */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-mint/30 to-primary-soft border border-border p-8 sm:p-12 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="space-y-4 text-right">
              <h2 className="text-2xl sm:text-3xl font-bold">ابنكم سيكبر بصحة، بإذن الله</h2>
              <p className="text-muted-foreground leading-loose">
                ابدؤوا بالأساسيات أولاً، ثم ارجعوا للدليل كلما ظهر سؤال جديد. التعلم المتدرّج يصنع فرقًا كبيرًا في ثقة الأسرة والطفل.
              </p>
              <Link
                to="/simplified-guide"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                ابدؤوا الدليل المبسّط
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
