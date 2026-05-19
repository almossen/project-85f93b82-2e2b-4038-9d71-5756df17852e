import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  BookOpen,
  Lock,
  HeartHandshake,
  Languages,
  Stethoscope,
  Sparkles,
  Users,
  GraduationCap,
  Baby,
} from "lucide-react";
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
    title: "بإشراف طبي",
    text: "كل درس يمرّ بمراجعة المشرف الطبي قبل النشر، ويتم تحديثه دورياً.",
  },
  {
    icon: HeartHandshake,
    title: "نبرة مطمئنة",
    text: "لا تخويف، لا لوم، لا وعود. فقط معلومة واضحة وخطوة عملية.",
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

const modules = [
  { num: "٠١", title: "البداية والطمأنة", desc: "خمسة دروس لاحتواء صدمة التشخيص.", count: "٥ دروس", open: true },
  { num: "٠٢", title: "أهم ما يجب معرفته الآن", desc: "أساسيات اليوم الأول والتواصل مع الطبيب.", count: "٥ دروس", open: false },
  { num: "٠٣", title: "الإنسولين ببساطة", desc: "ما هو، أنواعه، أين يُحقن، وكيف يُحفظ.", count: "٥ دروس", open: false },
  { num: "٠٤", title: "قياس السكر وفهم القراءات", desc: "متى نقيس، وماذا تعني القراءات.", count: "٥ دروس", open: false },
  { num: "٠٥", title: "انخفاض السكر", desc: "العلامات والتصرّف بهدوء وسرعة.", count: "٥ دروس", open: false },
  { num: "٠٦", title: "ارتفاع السكر والكيتونات", desc: "الأسباب، الفحص، ومتى نذهب للطوارئ.", count: "٥ دروس", open: false },
  { num: "٠٧", title: "الطعام والكربوهيدرات", desc: "الكربوهيدرات والأكل السعودي والمطاعم.", count: "٥ دروس", open: false },
  { num: "٠٨", title: "المدرسة", desc: "خطة المدرسة وحقيبة السكري المدرسية.", count: "٥ دروس", open: false },
  { num: "٠٩", title: "الطفل والأسرة نفسياً", desc: "الشرح للطفل، خوف الأهل، ودعم الإخوة.", count: "٥ دروس", open: false },
  { num: "١٠", title: "الاستعداد للحياة اليومية", desc: "الخروج، النوم، اللعب، الزيارات، السفر.", count: "٦ دروس", open: false },
];

const upcomingLessons = [
  { num: "٠١", title: "بداية الرحلة", desc: "هذا ابتلاء ومعه لطف الله — وما هو سكري النوع الأول؟", duration: "٥ د", open: true, to: "/lesson/$id" as const, params: { id: "1" } },
  { num: "٠٢", title: "الأيام الأولى بعد التشخيص", desc: "ماذا يجب أن يعرف ولي الأمر؟ الإنسولين، القياس، الحقن، والحقيبة اليومية.", duration: "١٠ د", open: true, to: "/module/first-days" as const, params: undefined },
  { num: "٠٣", title: "قياس السكر", desc: "متى نقيس، وماذا تعني الأرقام.", duration: "٦ د", open: false, to: "/lesson/$id" as const, params: { id: "3" } },
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
                نموذج أولي بانتظار المراجعة والاعتماد الطبي
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
                <span className="block">سما</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium mt-2">
                  رحلة التعايش مع سكري النوع الأول
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-loose max-w-xl">
                منصة عربية مبسّطة تأخذ بيد الأسرة من اليوم الأول للتشخيص حتى التمكّن من إدارة الحياة اليومية بثقة وطمأنينة — معلومة واضحة في كل مرة، مع طمأنة، ثم تطبيق عملي بسيط.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/lesson/$id"
                  params={{ id: "1" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
                >
                  ابدأ من الدرس الأول
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  to="/module/first-days"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold hover:bg-muted transition-colors"
                >
                  استعرض الدرس الثاني
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> دروس قصيرة ٥–٨ دقائق
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

        {/* Why Sama */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 space-y-8">
          <header className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">لماذا منصة سما؟</h2>
            <p className="text-muted-foreground leading-loose">
              لأن الأسرة في الأسابيع الأولى تحتاج إلى ما يطمئنها قبل ما يثقل عليها بالمعلومات.
            </p>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* 30 days modules */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-6">
          <header className="flex items-end justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">رحلة أول ٣٠ يوم</h2>
              <p className="text-muted-foreground text-sm leading-loose">
                عشر وحدات تعليمية مرتّبة بحسب احتياج الأسرة في الأسابيع الأولى بعد التشخيص.
              </p>
            </div>
            <Link to="/journey" className="text-sm font-medium text-primary hover:underline">
              عرض الرحلة الكاملة ←
            </Link>
          </header>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {modules.map((m) => (
              <li
                key={m.num}
                className={`rounded-2xl border p-5 text-right shadow-[var(--shadow-card)] transition-all ${
                  m.open ? "border-primary/40 bg-card" : "border-border bg-muted/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-muted-foreground">{m.num}</span>
                  {m.open ? (
                    <span className="text-[10px] font-semibold rounded-full bg-success/15 text-success px-2 py-0.5">
                      متاحة
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold rounded-full bg-muted text-muted-foreground px-2 py-0.5">
                      <Lock className="h-3 w-3" /> قريباً
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-1.5 text-sm">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-loose mb-3">{m.desc}</p>
                <span className="text-[11px] text-muted-foreground">{m.count}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Lessons preview */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 space-y-6">
          <header className="flex items-end justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">ابدؤوا من هنا</h2>
              <p className="text-muted-foreground text-sm">أوّل ثلاثة دروس من الوحدة الأولى — الدرس الأول جاهز للعرض.</p>
            </div>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingLessons.map((l) => (
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
                    l.to === "/module/first-days" ? (
                      <Link to="/module/first-days" className="font-medium text-primary hover:underline">
                        ابدأ ←
                      </Link>
                    ) : (
                      <Link
                        to="/lesson/$id"
                        params={l.params ?? { id: "1" }}
                        className="font-medium text-primary hover:underline"
                      >
                        ابدأ ←
                      </Link>
                    )
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
