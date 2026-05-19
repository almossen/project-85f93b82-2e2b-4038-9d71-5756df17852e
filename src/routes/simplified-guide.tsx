import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Headphones,
  Heart,
  Info,
  Phone,
  Printer,
  Siren,
  Sparkles,
  Volume2,
} from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import {
  guideSections,
  guideSummary,
  guideSources,
  type GuideSection,
} from "@/data/simplifiedGuideContent";

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
  "تنبيه مهم: هذا المحتوى توعوي عام، ولا يغني عن تعليمات الطبيب أو فريق السكري المعالج. كل طفل له خطة علاجية خاصة به. في الحالات الطارئة، اتصل بالإسعاف أو توجه لأقرب طوارئ.";

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
  if (status !== "needs-medical-review") return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/20 text-warning-foreground px-2.5 py-1 text-[11px] font-semibold print:hidden">
      <AlertTriangle className="h-3 w-3" />
      يحتاج مراجعة طبية قبل النشر
    </span>
  );
}

function SectionCard({ section, index }: { section: GuideSection; index: number }) {
  const paragraphs = section.body.split("\n\n");

  return (
    <article
      id={section.id}
      className="rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden print:break-inside-avoid print:shadow-none"
    >
      <div className="aspect-[16/7] w-full bg-gradient-to-br from-primary-soft via-mint/30 to-sand flex items-center justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-16 w-16 text-primary/40" strokeWidth={1.5} />
        </div>
        <span className="absolute top-3 start-3 rounded-full bg-card/90 backdrop-blur px-3 py-1 text-xs font-semibold text-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-5">
        <header className="space-y-2">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{section.title}</h2>
            <ReviewBadge status={section.reviewStatus} />
          </div>
          {section.subtitle && (
            <p className="text-base text-muted-foreground">{section.subtitle}</p>
          )}
        </header>

        <div className="space-y-3.5 text-base sm:text-[17px] leading-loose text-foreground/90">
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        {section.bullets && section.bullets.length > 0 && (
          <ul className="grid sm:grid-cols-2 gap-2.5">
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

        {section.alert && (
          <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 shrink-0 text-warning-foreground mt-0.5" />
            <p className="text-sm sm:text-base leading-loose text-warning-foreground">
              {section.alert}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2 print:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            aria-label="استمع لهذا الجزء"
          >
            <Volume2 className="h-4 w-4" />
            استمع لهذا الجزء
            <span className="text-[11px] text-muted-foreground">(قريبًا)</span>
          </button>
          {section.relatedEmergencyScenario && (
            <Link
              to="/what-to-do-now"
              className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive border border-destructive/30 px-4 py-2 text-sm font-medium hover:bg-destructive/15 transition-colors"
            >
              <Siren className="h-4 w-4" />
              ماذا أفعل الآن؟
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function SimplifiedGuidePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return guideSections;
    return guideSections.filter(
      (s) =>
        s.title.includes(q) ||
        s.body.includes(q) ||
        (s.bullets ?? []).some((b) => b.includes(q))
    );
  }, [query]);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      {/* internal note */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-4 print:hidden">
        <p className="text-[11px] text-muted-foreground/80">
          ملاحظة داخلية: هذه صفحة تجريبية للمقارنة مع المحتوى الحالي.
        </p>
      </div>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        {/* top disclaimer */}
        <MedicalDisclaimer />

        {/* Hero */}
        <section className="rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary-soft via-card to-mint/30 p-6 sm:p-10 print:break-inside-avoid">
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
                <Sparkles className="h-3.5 w-3.5" />
                دليل مكتوب — مبسّط ومطمئن
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-foreground">
                الدليل المبسّط لأهالي أطفال السكري النوع الأول
              </h1>
              <p className="text-lg text-muted-foreground leading-loose">
                من اليوم الأول بعد التشخيص، نمشي معك خطوة بخطوة بلغة واضحة ومطمئنة.
              </p>
              <div className="rounded-2xl bg-card/80 backdrop-blur p-4 border border-border/60 flex gap-3 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <p className="text-sm sm:text-base leading-loose text-foreground/90">
                  <span className="font-bold">سما:</span> سأساعدك تفهم الأساسيات بهدوء. لا تحتاج أن
                  تعرف كل شيء اليوم. المهم أن تبدأ بالأهم.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 print:hidden">
                <a
                  href="#journey-start"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  ابدأ من هنا
                </a>
                <Link
                  to="/what-to-do-now"
                  className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive border border-destructive/30 px-5 py-2.5 text-sm font-semibold hover:bg-destructive/15 transition-colors"
                >
                  <Siren className="h-4 w-4" />
                  ماذا أفعل الآن؟
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
                >
                  <Headphones className="h-4 w-4" />
                  استمع للمحتوى لاحقًا
                </button>
              </div>
            </div>
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-mint/40 via-primary-soft to-sand flex items-center justify-center">
              <Heart className="h-32 w-32 text-primary/60" strokeWidth={1.2} />
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="space-y-5 print:hidden">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">كيف تستخدم هذا الدليل؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-loose">
              هذا الدليل صمم ليكون بسيطًا ومباشرًا. اقرأه من البداية، أو اختر الموضوع الذي تحتاجه
              الآن. إذا كنت في موقف عاجل، استخدم قسم "ماذا أفعل الآن"، وإذا كانت القراءة متعبة،
              يمكنك لاحقًا الاستماع للمقاطع الصوتية.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: BookOpen, title: "اقرأ بهدوء", text: "لا داعي للاستعجال. خذ وقتك في فهم كل قسم." },
              { icon: Info, title: "اختر ما تحتاجه", text: "استخدم البحث للوصول السريع للموضوع." },
              { icon: Heart, title: "ارجع وقت الحاجة", text: "الدليل معك دائمًا، احفظه واستخدمه." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-5 space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-loose">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Search */}
        <div className="sticky top-16 z-30 print:hidden">
          <input
            type="search"
            placeholder="ابحث في الدليل…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-card/95 backdrop-blur px-5 py-3 text-base shadow-[var(--shadow-soft)] focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="ابحث في الدليل"
          />
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {filtered.map((s, i) => (
            <SectionCard key={s.id} section={s} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-10">لا توجد نتائج مطابقة.</p>
          )}
        </div>

        {/* Summary */}
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

        {/* Bottom disclaimer */}
        <MedicalDisclaimer />

        {/* Sources */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-4 print:break-inside-avoid">
          <h2 className="text-2xl font-bold">مصادر للاستئناس والمراجعة الطبية</h2>
          <ul className="space-y-2.5">
            {guideSources.map((s) => (
              <li key={s.url} className="flex items-start gap-2 text-sm sm:text-base">
                <Info className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
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
              href="tel:937"
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Phone className="h-4 w-4" />
              937 — الإسعاف الصحي
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
