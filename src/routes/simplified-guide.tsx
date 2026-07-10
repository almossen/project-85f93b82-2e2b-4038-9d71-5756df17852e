import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Heart,
  Phone,
  Printer,
  Siren,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { GuideSectionEnrichment } from "@/components/sama/GuideSectionEnrichment";

import { GuideSectionHero } from "@/components/sama/GuideSectionHero";
import { LessonAudioPlayer } from "@/components/sama/LessonAudioPlayer";
import { Quiz } from "@/components/sama/Quiz";
import {
  guideSections,
  guideSummary,
  guideSources,
  guideSectionHeroes,
  type GuideSection,
} from "@/data/simplifiedGuideContent";

type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  sectionIds: string[];
};

const chapters: Chapter[] = [
  {
    id: "ch-1",
    title: "الفصل الأول: البداية",
    subtitle: "الأيام الأولى بعد التشخيص",
    sectionIds: ["journey-start", "what-is-t1d", "first-week", "parents-feelings"],
  },
  {
    id: "ch-2",
    title: "الفصل الثاني: الإنسولين",
    subtitle: "ما هو ولماذا وكيف",
    sectionIds: ["what-is-insulin", "rapid-insulin", "long-insulin", "injection-basics"],
  },
  {
    id: "ch-3",
    title: "الفصل الثالث: قياس السكر",
    subtitle: "الجهاز، الحساس، والأسهم",
    sectionIds: ["why-measure", "fingerstick", "cgm-sensor", "sensor-arrows"],
  },
  {
    id: "ch-4",
    title: "الفصل الرابع: الانخفاض والارتفاع",
    subtitle: "الهبوط، الارتفاع، والكيتونات",
    sectionIds: ["low-sugar", "severe-low", "high-sugar", "ketones"],
  },
  {
    id: "ch-5",
    title: "الفصل الخامس: الحياة اليومية",
    subtitle: "المرض، الأكل، المدرسة، واللعب",
    sectionIds: [
      "illness",
      "sick-day-plan",
      "food-allowed",
      "carbs",
      "school",
      "diabetes-bag",
      "play-sport",
    ],
  },
  {
    id: "ch-6",
    title: "الفصل السادس: الطوارئ والدعم",
    subtitle: "الجلوكاجون، الطوارئ، والثقة",
    sectionIds: ["glucagon", "emergency", "confidence", "family-role", "final-message"],
  },
];

const sectionMap = new Map(guideSections.map((s) => [s.id, s]));

export const Route = createFileRoute("/simplified-guide")({
  head: () => ({
    meta: [
      { title: "الدليل المبسّط لأهالي أطفال السكري النوع الأول — سما" },
      {
        name: "description",
        content:
          "دليل مكتوب مبسّط ومطمئن لأولياء أمور الأطفال المصابين حديثًا بسكري النوع الأول، خطوة بخطوة من اليوم الأول.",
      },
      { property: "og:title", content: "الدليل المبسّط لأهالي أطفال السكري النوع الأول" },
      {
        property: "og:description",
        content: "محتوى مكتوب جميل ومنظم وسهل القراءة، من اليوم الأول بعد التشخيص.",
      },
    ],
  }),
  component: SimplifiedGuidePage,
});

const MEDICAL_DISCLAIMER =
  "تنبيه مهم: هذا المحتوى توعوي عام، ولا يغني عن تعليمات الطبيب أو فريق السكري المعالج. كل طفل له خطة علاجية خاصة به. في الحالات الطارئة، اتصل بالهلال الأحمر السعودي 997 أو توجه لأقرب طوارئ.";

function MedicalDisclaimer() {
  return (
    <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 sm:p-5 flex gap-3 items-start print:break-inside-avoid">
      <AlertTriangle className="h-5 w-5 shrink-0 text-warning-foreground mt-0.5" />
      <p className="text-sm sm:text-base leading-loose text-warning-foreground">
        {MEDICAL_DISCLAIMER}
      </p>
    </div>
  );
}

function ReviewBadge({ status }: { status: GuideSection["reviewStatus"] }) {
  if (status !== "approved") return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/30 text-mint-foreground px-2.5 py-1 text-[11px] font-semibold print:hidden">
      <ShieldCheck className="h-3 w-3" />
      تمت مراجعته طبيًا
    </span>
  );
}

// أسئلة عملية للطبيب حسب القسم
const doctorQuestions: Record<string, string> = {
  "what-is-insulin": "ما هي خطة الإنسولين الخاصة بطفلي مكتوبةً، ومتى تُراجع؟",
  "rapid-insulin": "متى أعطي جرعة سريع المفعول بالضبط، وماذا أفعل إذا نسيت الجرعة؟",
  "long-insulin": "ماذا أفعل إذا نسيت أو تأخرت في جرعة الإنسولين طويل المفعول؟",
  "injection-basics": "هل تستطيعون مراجعة طريقة الحقن معي عمليًا، وأماكن التغيير المناسبة؟",
  "low-sugar": "ما هو الرقم الذي يعتبر هبوطًا لطفلي بالضبط، وكم جرام سكر سريع أعطيه؟",
  "severe-low": "متى أستخدم الجلوكاجون ومن يجب أن يتدرب عليه في الأسرة والمدرسة؟",
  "high-sugar": "ما هي خطة التصحيح المكتوبة عند ارتفاع السكر، ومتى أتصل بكم؟",
  "ketones": "متى أفحص الكيتونات بالضبط؟ ومتى أذهب للطوارئ؟",
  "illness": "ما هي خطة أيام المرض لطفلي؟ هل أوقف الإنسولين إذا لم يأكل؟",
  "sick-day-plan": "هل يمكنكم تزويدي بخطة أيام المرض مكتوبة وواضحة؟",
  "school": "هل يمكن تزويدي بخطة مكتوبة للمدرسة تشرح حالة طفلي والإجراءات اللازمة؟",
  "glucagon": "متى أستخدم الجلوكاجون بالضبط، ومن يجب أن يتدرب على استخدامه؟",
  "emergency": "ما هي العلامات التي توجب الذهاب للطوارئ مباشرة دون انتظار؟",
};

function AskDoctorCard({ question }: { question: string }) {
  return (
    <div className="rounded-2xl border border-primary/30 bg-primary-soft/50 p-4 flex gap-3 items-start">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <HelpCircle className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-primary">اسأل طبيب طفلك</p>
        <p className="text-sm sm:text-base leading-loose text-foreground/90">{question}</p>
      </div>
    </div>
  );
}

const lessonOrdinals = [
  "الدرس الأول",
  "الدرس الثاني",
  "الدرس الثالث",
  "الدرس الرابع",
  "الدرس الخامس",
  "الدرس السادس",
  "الدرس السابع",
  "الدرس الثامن",
  "الدرس التاسع",
  "الدرس العاشر",
];

function SectionCard({
  section,
  index,
  lessonNumber,
  lessonTotal,
}: {
  section: GuideSection;
  index: number;
  lessonNumber?: number;
  lessonTotal?: number;
}) {
  const paragraphs = section.body.split("\n\n");
  const isHighSensitivity = section.medicalSensitivity === "high";
  const doctorQ = doctorQuestions[section.id];
  const printScopeId = `print-${section.id}`;
  const hero = guideSectionHeroes[section.id];
  const lessonOrdinal =
    lessonNumber && lessonNumber >= 1 && lessonNumber <= lessonOrdinals.length
      ? lessonOrdinals[lessonNumber - 1]
      : lessonNumber
      ? `الدرس ${lessonNumber}`
      : undefined;
  const lessonLabel =
    lessonOrdinal && lessonTotal
      ? `${lessonOrdinal} من ${lessonTotal}`
      : lessonOrdinal ?? "الدرس";

  const handleSectionPrint = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(printScopeId);
    if (!el) return window.print();
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) return;
    win.document.write(`<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>${section.title}</title><style>body{font-family:system-ui,Tahoma,Arial;padding:24px;line-height:1.9;color:#111}h1{font-size:22px;margin:0 0 12px}h2{font-size:16px;margin:16px 0 6px}ul{padding-inline-start:20px}li{margin:4px 0}.muted{color:#555;font-size:12px}</style></head><body>${el.innerHTML}<p class="muted">— من منصة سما — للاسترشاد فقط، لا تغني عن تعليمات الطبيب.</p></body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 250);
  };

  return (
    <article
      id={section.id}
      className="rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden print:break-inside-avoid print:shadow-none"
    >
      <GuideSectionHero
        image={hero?.image}
        alt={hero?.alt ?? section.imageAlt}
        index={index}
        fallbackLabel={section.imageAlt}
      />



      <div className="p-6 sm:p-8 space-y-5">
        <header className="space-y-2">
          {lessonNumber && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold print:bg-transparent print:text-foreground print:border print:border-border">
              {lessonLabel}
            </span>
          )}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{section.title}</h2>
            <ReviewBadge status={section.reviewStatus} />
          </div>
          {section.subtitle && (
            <p className="text-base text-muted-foreground">{section.subtitle}</p>
          )}
        </header>

        <LessonAudioPlayer sectionId={section.id} lessonLabel={lessonLabel} />


        <div id={printScopeId}>
          <h1 className="hidden print:block">{section.title}</h1>
          <div className="space-y-3.5 text-base sm:text-[17px] leading-loose text-foreground/90">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>

          {section.bullets && section.bullets.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-2.5 mt-4">
              {section.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2.5 rounded-2xl bg-muted/60 px-4 py-3 text-sm font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        {section.alert && (
          <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning-foreground mt-0.5" />
            <p className="text-sm sm:text-base leading-loose text-warning-foreground">
              {section.alert}
            </p>
          </div>
        )}

        <GuideSectionEnrichment sectionId={section.id} />

        {isHighSensitivity && doctorQ && <AskDoctorCard question={doctorQ} />}

        <div className="flex flex-wrap gap-2 pt-2 print:hidden">


          {section.id === "school" && (
            <button
              type="button"
              onClick={handleSectionPrint}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Printer className="h-4 w-4" />
              طباعة خطة المدرسة
            </button>
          )}

          {section.id === "diabetes-bag" && (
            <button
              type="button"
              onClick={handleSectionPrint}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Printer className="h-4 w-4" />
              طباعة قائمة الحقيبة
            </button>
          )}

          {section.relatedEmergencyScenario && (
            <a
              href={`/what-to-do-now?scenario=${section.relatedEmergencyScenario}`}
              className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive border border-destructive/30 px-4 py-2 text-sm font-medium hover:bg-destructive/15 transition-colors"
            >
              <Siren className="h-4 w-4" />
              ماذا أفعل الآن؟
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ReassuringPause() {
  return (
    <section className="rounded-3xl border border-primary/30 bg-primary-soft/60 p-6 sm:p-8 space-y-3 print:break-inside-avoid">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        <h3 className="text-xl sm:text-2xl font-bold">وقفة مطمئنة</h3>
      </div>
      <p className="text-base sm:text-[17px] leading-loose text-foreground/90">
        هذا ابتلاء ومعه لطف الله. الإيمان بالقضاء والقدر لا يلغي العلاج، بل يقوّي القلب على
        الالتزام به. سكري النوع الأول ليس عقوبة وليس دليلًا على تقصير الوالدين.
      </p>
    </section>
  );
}

function InsulinStorageSection() {
  const items = [
    "الإنسولين غير المستخدم يحفظ في الثلاجة حسب تعليمات النشرة والفريق الطبي.",
    "لا يوضع في الفريزر.",
    "القلم المستخدم يحفظ حسب تعليمات الشركة والفريق الطبي.",
    "لا يستخدم إذا تغير لونه أو ظهرت شوائب.",
    "أثناء السفر أو الحر، استخدم حقيبة تبريد مناسبة ولا تتركه في السيارة.",
  ];
  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-[var(--shadow-card)] print:break-inside-avoid">
      <header className="space-y-1">
        <h3 className="text-2xl sm:text-3xl font-bold">كيف أحفظ الإنسولين؟</h3>
        <p className="text-sm text-muted-foreground">حفظ صحيح للإنسولين يحمي مفعوله ويحمي طفلك.</p>
      </header>
      <ul className="space-y-2.5">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-start gap-2.5 rounded-2xl bg-muted/60 px-4 py-3 text-sm sm:text-base leading-loose"
          >
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TrueFalseSection() {
  const items = [
    { t: "إذا تحسنت القراءة أوقف الإنسولين", a: false, why: "خطأ — لا توقف الإنسولين من نفسك أبدًا، حتى لو تحسنت القراءات. أي تعديل يكون بتوجيه الطبيب." },
    { t: "كل أدوية السكري تناسب كل الأنواع", a: false, why: "خطأ — أدوية السكري النوع الثاني لا تستخدم لطفل السكري النوع الأول. الإنسولين هو العلاج الأساسي." },
    { t: "لا أغير الجرعة إلا بتوجيه الطبيب", a: true, why: "صح — تغيير الجرعة من تلقاء النفس قد يكون خطيرًا. التواصل مع الفريق الطبي هو الأساس." },
  ];
  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 shadow-[var(--shadow-card)] print:break-inside-avoid">
      <header className="space-y-1">
        <h3 className="text-2xl sm:text-3xl font-bold">صح أم خطأ؟</h3>
        <p className="text-sm text-muted-foreground">مفاهيم شائعة عن الإنسولين — نُصحّحها بهدوء.</p>
      </header>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.t} className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-start gap-2.5">
              {it.a ? (
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold text-sm sm:text-base">{it.t}</p>
                <p className="text-sm text-muted-foreground leading-loose">{it.why}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function GetHelpNowSection() {
  const items = [
    "فقدان الوعي",
    "التشنجات",
    "القيء المتكرر",
    "صعوبة التنفس",
    "الخمول الشديد",
    "علامات الجفاف",
    "وجود كيتونات مع مرض أو قيء",
    "انخفاض لا يتحسن حسب خطة الطبيب",
    "أي حالة لا تعرف الأسرة كيف تتصرف معها",
  ];
  return (
    <section className="rounded-3xl border border-destructive/40 bg-destructive/5 p-6 sm:p-8 space-y-4 print:break-inside-avoid">
      <header className="flex items-center gap-2">
        <Siren className="h-6 w-6 text-destructive" />
        <h2 className="text-2xl sm:text-3xl font-bold text-destructive">متى أطلب المساعدة فورًا؟</h2>
      </header>
      <p className="text-sm sm:text-base text-foreground/85 leading-loose">
إذا ظهرت أي من العلامات التالية، لا تنتظر — اتصل بالهلال الأحمر السعودي 997 أو توجه لأقرب طوارئ:
      </p>
      <ul className="grid sm:grid-cols-2 gap-2.5">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-start gap-2.5 rounded-2xl bg-card border border-border px-4 py-3 text-sm sm:text-base leading-loose"
          >
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-1" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2 pt-2 print:hidden">
        <a
          href="tel:997"
          className="inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground px-5 py-2.5 text-sm font-semibold hover:bg-destructive/90 transition-colors"
        >
          <Phone className="h-4 w-4" />
          اتصل بالهلال الأحمر 997
        </a>
      </div>
    </section>
  );
}

function SimplifiedGuidePage() {
  const [query, setQuery] = useState("");
  const [chapterIdx, setChapterIdx] = useState(0);

  const isSearching = query.trim().length > 0;

  const searchResults = useMemo(() => {
    const q = query.trim();
    if (!q) return [];
    return guideSections.filter(
      (s) =>
        s.title.includes(q) ||
        s.body.includes(q) ||
        (s.bullets ?? []).some((b) => b.includes(q))
    );
  }, [query]);

  const activeChapter = chapters[chapterIdx];
  const chapterSections = activeChapter.sectionIds
    .map((id) => sectionMap.get(id))
    .filter(Boolean) as GuideSection[];

  const goToChapter = (i: number) => {
    setChapterIdx(i);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        <MedicalDisclaimer />

        {/* Hero */}
        <section className="rounded-3xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] print:break-inside-avoid">
          <img
            src="/images/simplified-guide/hero-banner.png"
            alt="الدليل المبسّط لأهالي أطفال السكري النوع الأول — من اليوم الأول بعد التشخيص، نمشي معكم خطوة بخطوة بلغة واضحة ومطمئنة"
            loading="eager"
            decoding="async"
            className="w-full h-auto block"
          />
        </section>


        {/* Philosophy / About the platform — chapter 1 only */}
        {chapterIdx === 0 && !isSearching && (
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-9 print:hidden">
          <div className="space-y-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              فلسفة المنصة
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
              منصة تعليمية تمشي معك خطوة بخطوة
            </h2>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-loose">
              هدفنا أن نُعلّمك ما تحتاجه الآن، لا أن نغرقك بكل التفاصيل. كل فصل قصير
              ومبني على سؤال عملي يهم الأسرة في الأيام الأولى. ابدأ من الفصل الأول
              وتقدّم بهدوء، وإذا واجهت موقفًا عاجلًا فهناك زر مباشر لخطوات التصرف الفوري.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 pt-2 text-right">
              <div className="rounded-2xl bg-background border border-border p-4 flex gap-3 items-start">
                <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">تعلّم متدرّج</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    ستة فصول قصيرة، من البداية إلى الحياة اليومية.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-4 flex gap-3 items-start">
                <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">لغة مطمئنة</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    شرح واضح بلا مصطلحات معقّدة، مع وقفات إيمانية.
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-background border border-border p-4 flex gap-3 items-start">
                <Siren className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">جاهز للطوارئ</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    خطوات سريعة وواضحة عند أي موقف طارئ.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => goToChapter(0)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                ابدأ الفصل الأول
              </button>
              <Link
                to="/what-to-do-now"
                className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive border border-destructive/30 px-5 py-2.5 text-sm font-semibold hover:bg-destructive/15 transition-colors"
              >
                <Siren className="h-4 w-4" />
                ماذا أفعل في حالة الطوارئ؟
              </Link>
            </div>
          </div>
        </section>
        )}

        {/* Sticky top bar: chapters dropdown + current chapter + search */}
        <div className="sticky top-16 z-30 print:hidden space-y-2">
          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur shadow-[var(--shadow-soft)] p-3 sm:p-4 flex items-center gap-3 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  فهرس الفصول
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 max-w-[90vw]">
                {chapters.map((c, i) => {
                  const active = i === chapterIdx && !isSearching;
                  return (
                    <DropdownMenuItem
                      key={c.id}
                      onSelect={() => goToChapter(i)}
                      className={`flex items-start gap-3 py-3 cursor-pointer ${active ? "bg-primary-soft" : ""}`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-bold text-sm">{c.title}</div>
                        <div className="text-[11px] text-muted-foreground">{c.subtitle}</div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {!isSearching ? (
              <div className="flex-1 min-w-[180px]">
                <p className="text-[11px] text-muted-foreground">
                  الفصل {chapterIdx + 1} من {chapters.length}
                </p>
                <h2 className="text-base sm:text-lg font-bold leading-tight">{activeChapter.title}</h2>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground flex-1">
                نتائج البحث ({searchResults.length})
              </p>
            )}

            <input
              type="search"
              placeholder="ابحث في الدليل…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-64 rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="ابحث في الدليل"
            />
          </div>
        </div>


        {/* Sections */}
        <div className="space-y-8">
          {(isSearching ? searchResults : chapterSections).map((s, i) => {
            const sectionList = isSearching ? searchResults : chapterSections;
            const isLastInChapter = !isSearching && i === sectionList.length - 1;
            return (
              <div key={s.id} className="space-y-8">
                <SectionCard
                  section={s}
                  index={i}
                  lessonNumber={isSearching ? undefined : i + 1}
                  lessonTotal={isSearching ? undefined : sectionList.length}
                />
                {!isSearching && s.id === "journey-start" && <ReassuringPause />}
                {!isSearching && s.id === "injection-basics" && <InsulinStorageSection />}
                {!isSearching && chapterIdx === 1 && isLastInChapter && <TrueFalseSection />}
                {!isSearching && chapterIdx === 0 && isLastInChapter && (
                  <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)] print:break-inside-avoid">
                    <Quiz />
                  </section>
                )}
              </div>
            );
          })}
          {isSearching && searchResults.length === 0 && (
            <p className="text-center text-muted-foreground py-10">لا توجد نتائج مطابقة.</p>
          )}
        </div>

        {/* "متى أطلب المساعدة فورًا؟" — يظهر دائمًا في الفصل الأخير */}
        {!isSearching && chapterIdx === chapters.length - 1 && (
          <>
            <div className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary-soft/60 to-mint/20 p-6 sm:p-8 text-center space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold">هل تريدون أدوات عملية جاهزة؟</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-loose max-w-2xl mx-auto">
                قوالب رسالة للطبيب، أسئلة أول موعد، دفتر ملاحظات، وروتين ليلي — كلها في صفحة
                واحدة جاهزة للنسخ والطباعة.
              </p>
              <a
                href="/family-tools"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                افتح أدوات جاهزة للأسرة
              </a>
            </div>
            <GetHelpNowSection />
          </>
        )}


        {/* Chapter nav (prev / next) */}
        {!isSearching && (
          <nav className="flex items-center justify-between gap-3 print:hidden">
            <button
              type="button"
              onClick={() => goToChapter(Math.max(0, chapterIdx - 1))}
              disabled={chapterIdx === 0}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
              الفصل السابق
            </button>
            <span className="text-xs text-muted-foreground">
              {chapterIdx + 1} / {chapters.length}
            </span>
            <button
              type="button"
              onClick={() => goToChapter(Math.min(chapters.length - 1, chapterIdx + 1))}
              disabled={chapterIdx === chapters.length - 1}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              الفصل التالي
              <ChevronLeft className="h-4 w-4" />
            </button>
          </nav>
        )}

        {/* Summary - only show on last chapter or when searching is off and we're at end */}
        {(!isSearching && chapterIdx === chapters.length - 1) && (
          <section
            id="summary"
            className="rounded-3xl border border-primary/20 bg-primary-soft p-6 sm:p-8 space-y-5 print:break-inside-avoid"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold">أهم ما يجب تذكره</h2>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors print:hidden"
              >
                <Printer className="h-4 w-4" />
                طباعة الملخص
              </button>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {guideSummary.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 rounded-2xl bg-card px-4 py-3 text-sm sm:text-base leading-loose"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <MedicalDisclaimer />

        {/* Sources */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 print:break-inside-avoid">
          <h2 className="text-2xl font-bold">مصادر للاستئناس والمراجعة الطبية</h2>
          <ul className="space-y-2.5">
            {guideSources.map((s) => (
              <li key={s.url} className="flex items-start gap-2 text-sm sm:text-base">
                <BookOpen className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-loose pt-2 border-t border-border/60">
            هذه المصادر للاستئناس وبناء المحتوى التوعوي، ويجب مراجعة المحتوى النهائي من طبيب مختص
            قبل النشر العام.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 print:hidden">
            <a
              href="tel:997"
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Phone className="h-4 w-4" />
              997 — الهلال الأحمر السعودي
            </a>
          </div>
        </section>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
