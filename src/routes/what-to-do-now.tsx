import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingDown,
  TrendingUp,
  FlaskConical,
  Thermometer,
  AlertTriangle,
  Syringe,
  Activity,
  School,
  Search,
  Printer,
  Share2,
  ArrowRight,
  Info,
  ShieldAlert,
  Phone,
  Siren,
  Volume2,
  type LucideIcon,
} from "lucide-react";
import {
  emergencyScenarios,
  type EmergencyScenario,
  type Severity,
} from "@/data/emergencyScenarios";

export const Route = createFileRoute("/what-to-do-now")({
  head: () => ({
    meta: [
      { title: "ماذا أفعل الآن؟ — سما" },
      {
        name: "description",
        content:
          "دليل سريع لأولياء أمور الأطفال المصابين بسكري النوع الأول للحالات اليومية والعاجلة بلغة عربية مبسطة.",
      },
    ],
  }),
  component: EmergencyGuidePage,
});

const iconMap: Record<string, LucideIcon> = {
  TrendingDown,
  TrendingUp,
  FlaskConical,
  Thermometer,
  AlertTriangle,
  Syringe,
  Activity,
  School,
};

const severityStyles: Record<
  Severity,
  { ring: string; chip: string; label: string; dot: string }
> = {
  critical: {
    ring: "border-destructive/40 bg-destructive/5 hover:bg-destructive/10",
    chip: "bg-destructive text-destructive-foreground",
    label: "حالة حرجة",
    dot: "bg-destructive",
  },
  warning: {
    ring: "border-warning/40 bg-warning/10 hover:bg-warning/15",
    chip: "bg-warning text-warning-foreground",
    label: "تحذير",
    dot: "bg-warning",
  },
  info: {
    ring: "border-primary/30 bg-primary/5 hover:bg-primary/10",
    chip: "bg-primary text-primary-foreground",
    label: "معلومة",
    dot: "bg-primary",
  },
  safe: {
    ring: "border-success/40 bg-success/10 hover:bg-success/15",
    chip: "bg-success text-success-foreground",
    label: "إرشادات آمنة",
    dot: "bg-success",
  },
};

function MedicalAlert() {
  return (
    <div className="rounded-2xl border-2 border-destructive/40 bg-destructive/5 p-4 sm:p-5 flex items-start gap-3">
      <ShieldAlert className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
      <p className="text-sm sm:text-base leading-loose text-foreground">
        <span className="font-bold text-destructive">تنويه: </span>
        محتوى تثقيفي تمت مراجعته طبيًا، ولا يغني عن تعليمات الفريق الطبي المعالج. في
        الحالات الطارئة أو عند الشك، اتصل بالهلال الأحمر السعودي 997 أو توجه لأقرب طوارئ.
      </p>
    </div>
  );
}

function EmergencyGuidePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<EmergencyScenario | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("scenario");
    if (!id) return;
    const found = emergencyScenarios.find((s) => s.id === id);
    if (found) setActive(found);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return emergencyScenarios;
    return emergencyScenarios.filter(
      (s) =>
        s.title.includes(q) ||
        s.shortDescription.includes(q) ||
        s.whatItMeans.includes(q),
    );
  }, [query]);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleShare = async (s: EmergencyScenario) => {
    if (typeof navigator === "undefined") return;
    const text = `${s.title}\n\n${s.printableSummary}\n\n— من منصة سما`;
    if (navigator.share) {
      try {
        await navigator.share({ title: s.title, text });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      alert("تم نسخ ملخص الحالة. يمكنك لصقه في المدرسة أو الواتساب.");
    }
  };

  const handleSpeak = (_s: EmergencyScenario) => {
    alert("سيتم إضافة الصوت الواقعي قريبًا بإذن الله.");
  };

  return (
    <div className="min-h-screen bg-background pb-32 print:pb-0">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm print:hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
            <span>الرئيسية</span>
          </Link>
          <span className="text-xs font-medium text-muted-foreground">
            سما — دليل الحالات
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Hero */}
        <section className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive px-3 py-1 text-xs font-semibold">
            <Siren className="h-3.5 w-3.5" />
            قسم سريع للحالات
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            ماذا أفعل الآن؟
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-loose">
            لا تحتاج أن تتذكر كل شيء. اختر الحالة التي أمامك الآن واتبع الخطوات
            بهدوء.
          </p>
          <div className="max-w-2xl mx-auto rounded-2xl bg-primary-soft/60 border border-primary/20 p-4 text-sm sm:text-base text-primary-foreground/90 flex items-start gap-3 text-right">
            <div className="h-9 w-9 shrink-0 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold">
              س
            </div>
            <p className="leading-loose text-foreground">
              <span className="font-bold">أنا سما،</span> سأساعدك تختار الحالة
              الأقرب لما يحدث الآن، لكن تذكر أن تعليمات طبيبك هي الأساس.
            </p>
          </div>
        </section>

        <MedicalAlert />

        {/* Search */}
        <div className="relative print:hidden">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث: هبوط، ارتفاع، كيتونات، قيء، مدرسة، حساس..."
            className="w-full rounded-2xl border border-border bg-card pr-12 pl-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/40"
            aria-label="ابحث في الحالات"
          />
        </div>

        {/* Cards grid */}
        {!active && (
          <section className="grid sm:grid-cols-2 gap-4">
            {filtered.map((s) => {
              const Icon = iconMap[s.icon] ?? Info;
              const style = severityStyles[s.severity];
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s)}
                  className={`text-right rounded-3xl border-2 ${style.ring} p-5 transition-colors flex items-start gap-4 group`}
                >
                  <div
                    className={`h-14 w-14 shrink-0 rounded-2xl ${style.chip} grid place-items-center shadow-sm`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2.2} />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg sm:text-xl font-bold">
                        {s.title}
                      </h2>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 ${style.chip}`}
                      >
                        {style.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-loose">
                      {s.shortDescription}
                    </p>
                    <span className="inline-block text-sm font-semibold text-primary mt-1 group-hover:underline">
                      اقرأ الخطوات ←
                    </span>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="sm:col-span-2 text-center text-muted-foreground py-10">
                لا توجد حالة مطابقة لبحثك.
              </p>
            )}
          </section>
        )}

        {/* Detail view */}
        {active && (
          <ScenarioDetail
            scenario={active}
            onBack={() => setActive(null)}
            onPrint={handlePrint}
            onShare={() => handleShare(active)}
            onSpeak={() => handleSpeak(active)}
          />
        )}

        <MedicalAlert />

        {/* Sources */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 space-y-3 print:hidden">
          <h3 className="text-lg font-bold">المصادر الطبية</h3>
          <p className="text-sm text-muted-foreground">
            مصادر تمت مراجعتها طبيًا، ولا تغني عن متابعة الطبيب المعالج.
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            <li>
              <a
                href="https://www.cdc.gov/diabetes/about/about-type-1-diabetes.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CDC: Type 1 Diabetes in Children
              </a>
            </li>
            <li>
              <a
                href="https://www.cdc.gov/diabetes/treatment/low-blood-sugar-hypoglycemia.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CDC: Low Blood Sugar Treatment
              </a>
            </li>
            <li>
              <a
                href="https://www.ispad.org/resources/ispad-clinical-practice-consensus-guidelines/2024-cpcg.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ISPAD Clinical Practice Guidelines
              </a>
            </li>
            <li>
              <a
                href="https://diabetesjournals.org/care/issue/48/Supplement_1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ADA Standards of Care
              </a>
            </li>
            <li>
              <a
                href="https://www.moh.gov.sa/HealthAwareness/EducationalContent/Diseases/diabetic/Pages/009.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                وزارة الصحة السعودية — السكري
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function Section({
  title,
  items,
  tone,
  icon: Icon,
}: {
  title: string;
  items: string[];
  tone: "do" | "dont" | "call" | "er";
  icon: LucideIcon;
}) {
  const toneClass = {
    do: "border-success/40 bg-success/10",
    dont: "border-warning/40 bg-warning/10",
    call: "border-primary/30 bg-primary/5",
    er: "border-destructive/40 bg-destructive/5",
  }[tone];
  const iconClass = {
    do: "text-success",
    dont: "text-warning",
    call: "text-primary",
    er: "text-destructive",
  }[tone];
  return (
    <section className={`rounded-2xl border-2 ${toneClass} p-4 sm:p-5`}>
      <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold mb-3">
        <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={2.3} />
        {title}
      </h3>
      <ul className="space-y-2.5 text-sm sm:text-base leading-loose">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${iconClass.replace("text-", "bg-")}`}
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ScenarioDetail({
  scenario,
  onBack,
  onPrint,
  onShare,
  onSpeak,
}: {
  scenario: EmergencyScenario;
  onBack: () => void;
  onPrint: () => void;
  onShare: () => void;
  onSpeak: () => void;
}) {
  const Icon = iconMap[scenario.icon] ?? Info;
  const style = severityStyles[scenario.severity];

  return (
    <article className="space-y-5 print:space-y-3">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline print:hidden"
      >
        <ArrowRight className="h-4 w-4" />
        رجوع لقائمة الحالات
      </button>

      <header
        className={`rounded-3xl border-2 ${style.ring} p-5 sm:p-6 flex items-start gap-4`}
      >
        <div
          className={`h-16 w-16 shrink-0 rounded-2xl ${style.chip} grid place-items-center shadow-sm`}
        >
          <Icon className="h-8 w-8" strokeWidth={2.2} />
        </div>
        <div className="space-y-1.5 flex-1">
          <span
            className={`inline-block text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 ${style.chip}`}
          >
            {style.label}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">{scenario.title}</h2>
          <p className="text-muted-foreground leading-loose">
            {scenario.shortDescription}
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 print:hidden">
        <button
          onClick={onPrint}
          className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          <Printer className="h-4 w-4" /> اطبع هذه الحالة
        </button>
        <button
          onClick={onShare}
          className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          <Share2 className="h-4 w-4" /> شاركها مع المدرسة
        </button>
        <button
          onClick={onSpeak}
          className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          <Volume2 className="h-4 w-4" /> قراءة صوتية
        </button>
      </div>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h3 className="flex items-center gap-2 text-base sm:text-lg font-bold mb-2">
          <Info className="h-5 w-5 text-primary" strokeWidth={2.3} />
          ماذا يعني هذا؟
        </h3>
        <p className="text-sm sm:text-base leading-loose">
          {scenario.whatItMeans}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        <Section
          title="ماذا أفعل الآن؟"
          items={scenario.whatToDo}
          tone="do"
          icon={Info}
        />
        <Section
          title="ماذا لا أفعل؟"
          items={scenario.whatNotToDo}
          tone="dont"
          icon={AlertTriangle}
        />
        <Section
          title="متى أتصل بالفريق الطبي؟"
          items={scenario.whenToCallDoctor}
          tone="call"
          icon={Phone}
        />
        <Section
          title="متى أذهب للطوارئ؟"
          items={scenario.whenToGoER}
          tone="er"
          icon={Siren}
        />
      </div>

      <section className="rounded-2xl bg-muted/50 border border-border p-4 sm:p-5 hidden print:block">
        <h3 className="font-bold mb-2">ملخص للطباعة</h3>
        <p className="leading-loose">{scenario.printableSummary}</p>
      </section>
    </article>
  );
}
