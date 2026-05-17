import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock, Sparkles, CalendarDays } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "رحلة أول ٣٠ يوم — سما" },
      {
        name: "description",
        content:
          "عشر وحدات تعليمية مرتّبة بحسب احتياج الأسرة في الأيام الأولى بعد تشخيص سكري النوع الأول.",
      },
    ],
  }),
  component: JourneyPage,
});

type UnitStatus = "available" | "in-progress" | "locked" | "done";

type Unit = {
  num: string;
  title: string;
  desc: string;
  lessons: number;
  days: string;
  status: UnitStatus;
  firstLessonId?: string;
  moduleRoute?: "/module/first-days";
};

const units: Unit[] = [
  {
    num: "٠١",
    title: "البداية والطمأنة",
    desc: "خمسة دروس لاحتواء صدمة التشخيص واستعادة التوازن النفسي للأسرة.",
    lessons: 5,
    days: "اليوم ١ – ٣",
    status: "in-progress",
    firstLessonId: "1",
  },
  {
    num: "٠٢",
    title: "الأيام الأولى بعد التشخيص",
    desc: "ماذا يجب أن يعرف ولي الأمر؟ — الإنسولين، القياس، الحقن، الحفظ، وحقيبة السكري.",
    lessons: 10,
    days: "اليوم ٤ – ٦",
    status: "available",
    moduleRoute: "/module/first-days",
  },
  {
    num: "٠٣",
    title: "الإنسولين ببساطة",
    desc: "ما هو، أنواعه، طريقة الحقن، أماكنه، وكيف يُحفظ في البيت.",
    lessons: 5,
    days: "اليوم ٧ – ٩",
    status: "locked",
  },
  {
    num: "٠٤",
    title: "قياس السكر وفهم القراءات",
    desc: "متى نقيس، كيف نقرأ الجهاز، وماذا تعني الأرقام في كل وقت.",
    lessons: 5,
    days: "اليوم ١٠ – ١٢",
    status: "locked",
  },
  {
    num: "٠٥",
    title: "انخفاض السكر",
    desc: "العلامات، التصرف بهدوء وسرعة، وقاعدة ١٥/١٥.",
    lessons: 5,
    days: "اليوم ١٣ – ١٥",
    status: "locked",
  },
  {
    num: "٠٦",
    title: "ارتفاع السكر والكيتونات",
    desc: "الأسباب، فحص الكيتون، ومتى نذهب للطوارئ.",
    lessons: 5,
    days: "اليوم ١٦ – ١٨",
    status: "locked",
  },
  {
    num: "٠٧",
    title: "الطعام والكربوهيدرات",
    desc: "حساب الكربوهيدرات، الأكل السعودي، الوجبات الخارجية والمناسبات.",
    lessons: 5,
    days: "اليوم ١٩ – ٢١",
    status: "locked",
  },
  {
    num: "٠٨",
    title: "المدرسة",
    desc: "خطة المدرسة، تجهيز حقيبة السكري المدرسية، والتواصل مع المعلمين.",
    lessons: 5,
    days: "اليوم ٢٢ – ٢٤",
    status: "locked",
  },
  {
    num: "٠٩",
    title: "الطفل والأسرة نفسياً",
    desc: "كيف نشرح للطفل، احتواء خوف الأهل، ودعم الإخوة.",
    lessons: 5,
    days: "اليوم ٢٥ – ٢٧",
    status: "locked",
  },
  {
    num: "١٠",
    title: "الاستعداد للحياة اليومية",
    desc: "الخروج، النوم، اللعب، الزيارات، والسفر بثقة.",
    lessons: 6,
    days: "اليوم ٢٨ – ٣٠",
    status: "locked",
  },
];

const totalLessons = units.reduce((s, u) => s + u.lessons, 0);
const completedLessons = 0; // POC: لا يوجد درس مكتمل بعد
const progressPct = Math.round((completedLessons / totalLessons) * 100);
const availableLessons = 11; // الدرس الأول + ١٠ دروس الوحدة الثانية

function StatusBadge({ s }: { s: UnitStatus }) {
  if (s === "in-progress")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground px-2.5 py-1 text-[10px] font-semibold">
        قيد التعلّم
      </span>
    );
  if (s === "done")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 text-success px-2.5 py-1 text-[10px] font-semibold">
        <Check className="h-3 w-3" /> مكتمل
      </span>
    );
  if (s === "available")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-mint/30 text-foreground px-2.5 py-1 text-[10px] font-semibold">
        متاح
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-1 text-[10px] font-semibold">
      <Lock className="h-3 w-3" /> قيد الإعداد
    </span>
  );
}

function UnitCard({ u, idx }: { u: Unit; idx: number }) {
  const isActive = u.status === "in-progress" || u.status === "available";
  const isLeft = idx % 2 === 0;
  return (
    <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center">
      {/* Card */}
      <div className={`${isLeft ? "md:col-start-1" : "md:col-start-3"}`}>
        <div
          className={`rounded-3xl p-6 sm:p-7 border shadow-[var(--shadow-card)] transition-all ${
            u.status === "in-progress"
              ? "bg-primary-soft border-primary/40"
              : u.status === "done"
                ? "bg-mint/20 border-mint"
                : u.status === "available"
                  ? "bg-card border-border"
                  : "bg-card/60 border-border/60 opacity-85"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-muted-foreground">الوحدة {u.num}</span>
            <StatusBadge s={u.status} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-right">{u.title}</h3>
          <p className="text-sm text-muted-foreground leading-loose text-right">{u.desc}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {u.days}
            </span>
            <span>{u.lessons} دروس</span>
          </div>
          {isActive && u.firstLessonId ? (
            <Link
              to="/lesson/$id"
              params={{ id: u.firstLessonId }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ابدأ الوحدة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>

      {/* Center node */}
      <div className="hidden md:flex md:col-start-2 flex-col items-center justify-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold border-4 border-background shadow-[var(--shadow-soft)] ${
            u.status === "in-progress"
              ? "bg-primary text-primary-foreground"
              : u.status === "done"
                ? "bg-mint text-mint-foreground"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {u.num}
        </div>
      </div>

      {/* Empty side */}
      <div className={`${isLeft ? "md:col-start-3" : "md:col-start-1"} hidden md:block`} />
    </div>
  );
}

function JourneyPage() {
  const completedUnits = units.filter((u) => u.status === "done").length;
  const inProgressUnits = units.filter((u) => u.status === "in-progress").length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-60" aria-hidden />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 text-center space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur border border-border px-3 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              رحلة أول ٣٠ يوم بعد التشخيص
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              عشر وحدات. ثلاثون يوماً. خطوة بخطوة.
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-loose">
              كل وحدة تأخذ من ٢ إلى ٣ أيام بمعدّل درس قصير في اليوم. ابدأ بالوحدة الأولى اليوم،
              وستجد الباقي ينفتح أمامك تدريجياً.
            </p>
          </div>
        </section>

        {/* Progress overview */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 -mt-2 sm:mt-0">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
              <div className="text-right">
                <div className="text-xs font-semibold text-muted-foreground mb-1">تقدّمك في الرحلة</div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {completedLessons} <span className="text-muted-foreground text-base font-medium">من {totalLessons} درساً</span>
                </div>
              </div>
              <div className="text-left text-sm text-muted-foreground">
                <div>{progressPct}٪ مكتمل</div>
                <div className="text-xs">{availableLessons} درس متاح الآن</div>
              </div>
            </div>
            <Progress value={progressPct} className="h-3" />
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Stat label="وحدات مكتملة" value={completedUnits} />
              <Stat label="قيد التعلّم" value={inProgressUnits} />
              <Stat label="إجمالي الوحدات" value={units.length} />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 relative">
          <div
            className="hidden md:block absolute right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-border to-muted translate-x-1/2"
            aria-hidden
          />
          <div className="space-y-8 sm:space-y-10 relative">
            {units.map((u, i) => (
              <UnitCard key={u.num} u={u} idx={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-20 text-center">
          <div className="rounded-3xl bg-primary-soft border border-primary/30 p-8 sm:p-10 shadow-[var(--shadow-card)]">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">ابدأ بالدرس الأول اليوم</h2>
            <p className="text-muted-foreground leading-loose mb-6">
              «بداية الرحلة» — افتتاح إيماني وطمأنة، ثم شرح مبسّط لما حدث لطفلكم. خمس دقائق فقط.
            </p>
            <Link
              to="/lesson/$id"
              params={{ id: "1" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              ابدأ الدرس الأول
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-muted/50 p-3">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
