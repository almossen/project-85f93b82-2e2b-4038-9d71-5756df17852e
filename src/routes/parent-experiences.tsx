import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  ExternalLink,
  Eye,
  

  Globe,
  HeartHandshake,
  Info,
  Moon,
  ShieldAlert,
  Sparkles,
  Users,
  Vibrate,
} from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import frioCase from "@/assets/frio-case.jpg.asset.json";
import sugarPixel from "@/assets/sugarpixel-classroom.webp.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/parent-experiences")({
  head: () => ({
    meta: [
      { title: "تجارب أهالي مفيدة — سما" },
      {
        name: "description",
        content:
          "تجارب شخصية من أهالي أطفال السكري النوع الأول مع أدوات وأجهزة ساعدتهم في المتابعة والسفر والحياة اليومية، دون إعلانات أو عمولات.",
      },
      { property: "og:title", content: "تجارب أهالي مفيدة — سما" },
      {
        property: "og:description",
        content:
          "تجارب شخصية من أهالي أطفال السكري النوع الأول مع أدوات وأجهزة ساعدتهم في المتابعة والسفر والحياة اليومية، دون إعلانات أو عمولات.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://t1d-ar.com/parent-experiences" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "تجارب أهالي مفيدة — سما" },
      {
        name: "twitter:description",
        content:
          "تجارب شخصية من أهالي أطفال السكري النوع الأول مع أدوات وأجهزة ساعدتهم في المتابعة والسفر.",
      },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/parent-experiences" }],
  }),
  component: ParentExperiencesPage,
});

const features = [
  { icon: Eye, title: "عرض دائم وواضح", body: "أرقام كبيرة تُقرأ من بعيد طوال اليوم بدون لمس." },
  { icon: Globe, title: "يعمل عن بُعد", body: "طفلك في المدرسة أو مدينة أخرى والقراءة تصلك لحظياً." },
  { icon: Bell, title: "تنبيهات صوتية", body: "نغمات مختلفة في كل مرة لمنع التعوّد والتجاهل." },
  { icon: Vibrate, title: "قرص اهتزاز", body: "يوضع تحت الوسادة — للنوم العميق وضعاف السمع." },
  { icon: Users, title: "متابعة شخصين", body: "جهاز واحد يعرض سكر شخصين في آن واحد." },
  { icon: Moon, title: "تنبيه ليلي", body: "مصمّم لإيقاظ النائم العميق عند الخطر دون إزعاج الجميع." },
];

const devices = [
  { name: "Dexcom", detail: "G5 · G6 · G7 · ONE · ONE+", tag: "ربط مباشر" },
  { name: "Freestyle Libre", detail: "Libre 2 · Libre 3 (مشاركة تلقائية)", tag: "ربط مباشر" },
  { name: "Gluroo", detail: "بديل مجاني وسهل لمن ليس لديه خبرة تقنية", tag: "عبر Gluroo" },
  { name: "Nightscout", detail: "Eversense · Medtronic وأجهزة أخرى", tag: "عبر Nightscout" },
];

const steps: Record<string, { label: string; items: [string, string][]; tip: string }> = {
  dexcom: {
    label: "Dexcom",
    items: [
      ["فعّل مشاركة Dexcom Share", "افتح تطبيق Dexcom على هاتف طفلك ← Share ← أضف متابعاً واحداً على الأقل ببريدك الإلكتروني."],
      ["حمّل تطبيق SugarPixel Hub", "ابحث عنه في App Store أو Google Play وثبّته على هاتفك أنت."],
      ["وصّل الجهاز بشبكة WiFi", "شغّل الجهاز ← افتح التطبيق ← Add SugarPixel ← أدخل اسم الشبكة وكلمة المرور."],
      ["أضف مصدر البيانات", "Add Data Source ← اختر Dexcom ← أدخل بيانات حساب Dexcom الخاص بطفلك."],
      ["اضبط حدود التنبيه", "حدّد مستوى السكر المنخفض والمرتفع — راجعوا الطبيب للأرقام المناسبة لطفلكم."],
    ],
    tip: "إذا لم تظهر البيانات: تأكد أن هناك متابعاً مضافاً في إعدادات Share داخل تطبيق Dexcom.",
  },
  libre: {
    label: "Freestyle Libre",
    items: [
      ["فعّل LibreLinkUp", "تطبيق LibreLink على هاتف طفلك ← الإعدادات ← Connected Apps ← فعّل LibreLinkUp وأضف نفسك كمتابع."],
      ["حمّل SugarPixel Hub", "ابحث عنه في App Store أو Google Play على هاتفك."],
      ["وصّل الجهاز بشبكة WiFi", "شغّل الجهاز ← افتح التطبيق ← Add SugarPixel ← أدخل بيانات الشبكة."],
      ["أضف مصدر البيانات", "Add Data Source ← اختر Libre ← أدخل بيانات حسابك في LibreLinkUp."],
    ],
    tip: "تأكد أن جهاز Libre يدعم المشاركة التلقائية (Libre 2 أو 3) وليس المسح اليدوي.",
  },
  gluroo: {
    label: "Gluroo (الأسهل)",
    items: [
      ["أنشئ حساب Gluroo مجاني", "اذهب إلى gluroo.com وسجّل حساباً ببريدك الإلكتروني."],
      ["وصّل جهاز السكر بـ Gluroo", "اختر نوع جهاز طفلك داخل Gluroo وأدخل بيانات الحساب."],
      ["وصّل الجهاز بـ Gluroo", "افتح SugarPixel Hub ← Add Data Source ← اختر Gluroo ← أدخل بيانات حسابك."],
    ],
    tip: "Gluroo هو الخيار الأسهل — مناسب لمن ليس لديه خبرة تقنية.",
  },
};

const faqs: [string, string][] = [
  ["هل يجب أن يكون طفلي في نفس المنزل أو الشبكة؟", "لا. الجهاز يجلب البيانات من الإنترنت مباشرة، فطفلك قد يكون في المدرسة أو عند أقاربه أو في مدينة أخرى وتصلك القراءة لحظياً."],
  ["هل يحتاج الجهاز بلوتوث؟", "لا، يعمل عبر WiFi على شبكة 2.4 GHz فقط، ولا يحتاج قرباً من هاتف طفلك."],
  ["كم مرة تتحدّث القراءة؟", "كل ٥ دقائق تقريباً، حسب معدل إرسال جهاز القياس المستمر."],
  ["ماذا يحدث إذا انقطع الإنترنت؟", "يتوقف جلب القراءات الجديدة، ويوجد تنبيه خاص لانقطاع الاتصال."],
  ["كيف أغيّر وحدة القياس؟", "من التطبيق ← اختر الجهاز ← Display Settings ← اختر mg/dL أو mmol/L."],
  ["البيانات لا تظهر — ماذا أفعل؟", "تأكد أن الشبكة 2.4 GHz وتعمل، وأن البيانات تظهر في تطبيق Dexcom/Libre، وأن المتابع مضاف في إعدادات المشاركة، ثم أعد تشغيل الجهاز."],
  ["من أين يمكن شراؤه ويصل للسعودية؟", "خياران رسميان يشحنان من دبي: الموقع الرسمي customtypeone.com (‏110$ تقريباً) أو Diapoint (‏150$ تقريباً)، وقد تُطبّق رسوم جمركية عند الاستلام."],
];

const filters = [
  { id: "all", label: "كل التجارب" },
  { id: "devices", label: "أجهزة ومتابعة" },
  { id: "insulin", label: "حفظ الإنسولين" },
  { id: "travel", label: "سفر وتنقل" },
] as const;

type FilterId = (typeof filters)[number]["id"];

const frioBenefits = [
  { emoji: "💧", title: "تحتاج ماء فقط", body: "لا تحتاج إلى ثلاجة أو كهرباء لتفعيلها أثناء الاستخدام." },
  {
    emoji: "✈️",
    title: "مناسبة للسفر",
    body: "مفيدة في المطارات، الرحلات، المشاوير الطويلة والأيام التي نقضي فيها وقتًا طويلًا خارج المنزل.",
  },
  {
    emoji: "🎒",
    title: "خفيفة وسهلة الحمل",
    body: "يمكن وضع قلم الإنسولين داخلها وحملها بسهولة في حقيبة الطفل أو حقيبة الأدوية.",
  },
  {
    emoji: "🔄",
    title: "قابلة لإعادة الاستخدام",
    body: "يمكن إعادة تفعيلها بالماء حسب تعليمات الشركة المصنعة.",
  },
];

const frioMoments = [
  "السفر ✈️",
  "الرحلات البرية 🚗",
  "المشاوير الطويلة",
  "المدرسة",
  "الحدائق والأنشطة الخارجية",
  "الأيام الحارة",
];

function ParentExperiencesPage() {
  const [tab, setTab] = useState<keyof typeof steps>("dexcom");
  const [filter, setFilter] = useState<FilterId>("all");
  const active = steps[tab];
  const showSugar = filter === "all" || filter === "devices";
  const showFrio = filter === "all" || filter === "insulin" || filter === "travel";


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-6 sm:py-12 space-y-10">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 print:hidden">
          <Link to="/" className="inline-flex items-center min-h-11 px-1 hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180" />
          <span className="text-foreground">تجارب أهالي مفيدة</span>
        </nav>

        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-primary">
            <HeartHandshake className="h-4 w-4" />
            تجارب أهالي مفيدة
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            اجتهادات وتجارب من أهالٍ عاشوا الرحلة
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-loose">
            هذه المساحة لتجارب شخصية شاركها أهالي أطفال مصابين بسكري النوع الأول. ليست توصية طبية
            ولا إعلاناً تجارياً، بل خبرة عملية قد تختصر عليكم الطريق.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-2 print:hidden">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={
                filter === f.id
                  ? "rounded-full bg-primary text-primary-foreground px-4 py-2 min-h-11 text-sm font-semibold"
                  : "rounded-full border border-border bg-card px-4 py-2 min-h-11 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {showSugar && (
        <div className="space-y-10">
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-7 space-y-6 shadow-[var(--shadow-soft)]">

          <div className="space-y-2">
            <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              تجربة (١) — متابعة السكر عن بُعد
            </span>
            <h2 className="text-2xl font-bold">شاشة تعرض سكر طفلك لحظياً وتنبّهك فوراً</h2>
            <p className="text-muted-foreground leading-loose">
              جهاز مستقل (SugarPixel) يتصل بجهاز القياس المستمر عبر الإنترنت ويعرض القراءة على مدار
              الساعة — حتى لو كان طفلك في مدرسة أخرى أو مدينة أخرى.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-[420px]">
            <img
              src={sugarPixel.url}
              alt="جهاز SugarPixel على طاولة داخل فصل دراسي يعرض قراءة السكر ١١٣ بسهم ثابت"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl border border-border bg-muted/30 object-cover"
            />
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              SugarPixel — القراءة تظهر بوضوح حتى داخل الفصل الدراسي
            </figcaption>
          </figure>


          <ul className="flex flex-wrap gap-2 text-sm">
            {["لا يحتاج قرب المريض", "لا يحتاج نفس الشبكة", "يعمل من أي مكان"].map((k) => (
              <li key={k} className="rounded-full bg-success/10 px-3 py-1.5 font-medium text-success">
                ✓ {k}
              </li>
            ))}
          </ul>

          <div className="rounded-2xl bg-muted/60 border-r-4 border-primary p-4 text-sm leading-loose text-muted-foreground">
            <strong className="block text-foreground mb-1">ملاحظة مهمة</strong>
            هذا الشرح اجتهاد شخصي من ولي أمر، والمعلومات مستقاة من الموقع الرسمي للجهاز. يُنصح
            بالتحقق من أي معلومة أو سعر مباشرةً من{" "}
            <a
              href="https://customtypeone.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              الموقع الرسمي
            </a>{" "}
            قبل اتخاذ أي قرار.
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">لماذا وجده الأهالي مفيداً؟</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-4 flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <f.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="rounded-2xl bg-primary-soft/60 border-r-4 border-primary p-4 text-sm leading-loose text-foreground">
            <Sparkles className="inline h-4 w-4 text-primary ml-1" />
            كيف يعمل بدون قرب؟ جهاز القياس يرسل البيانات لتطبيق طفلك، والتطبيق يرفعها للإنترنت،
            والجهاز يجلبها تلقائياً كل ٥ دقائق.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">هل يعمل مع جهاز طفلي؟</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {devices.map((d) => (
              <div key={d.name} className="rounded-2xl border border-border bg-card p-4 space-y-1">
                <div className="font-semibold">{d.name}</div>
                <p className="text-sm text-muted-foreground">{d.detail}</p>
                <span className="inline-block rounded-full bg-success/10 px-2.5 py-1 text-sm font-medium text-success">
                  {d.tag}
                </span>
              </div>
            ))}
          </div>
          <p className="rounded-2xl bg-warning/10 border-r-4 border-warning p-4 text-sm leading-loose text-foreground">
            أجهزة Libre التي تحتاج مسحاً يدوياً (غير تلقائية) غير مدعومة.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">خطوات الربط حسب نوع الجهاز</h3>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(steps) as (keyof typeof steps)[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                aria-pressed={tab === k}
                className={
                  tab === k
                    ? "rounded-full bg-primary text-primary-foreground px-4 py-2 min-h-11 text-sm font-semibold"
                    : "rounded-full border border-border bg-card px-4 py-2 min-h-11 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                }
              >
                {steps[k].label}
              </button>
            ))}
          </div>
          <ol className="rounded-2xl border border-border bg-card divide-y divide-border">
            {active.items.map(([t, d], i) => (
              <li key={t} className="flex gap-3 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-sm">{t}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="rounded-2xl bg-muted/60 border-r-4 border-primary p-4 text-sm leading-loose text-muted-foreground">
            <Info className="inline h-4 w-4 text-primary ml-1" />
            {active.tip}
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">التنبيهات والألوان</h3>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-2xl bg-destructive/10 border border-destructive/30 p-3 text-center">
              <div className="text-2xl font-bold text-destructive">55</div>
              <div className="text-sm text-destructive">منخفض — تنبيه عاجل</div>
            </div>
            <div className="rounded-2xl bg-success/10 border border-success/30 p-3 text-center">
              <div className="text-2xl font-bold text-success">110</div>
              <div className="text-sm text-success">مستوى طبيعي — هادئ</div>
            </div>
            <div className="rounded-2xl bg-warning/10 border border-warning/30 p-3 text-center">
              <div className="text-2xl font-bold text-warning">250</div>
              <div className="text-sm text-warning">مرتفع — تنبيه</div>
            </div>
          </div>
          <p className="rounded-2xl bg-destructive/10 border-r-4 border-destructive p-4 text-sm leading-loose text-foreground">
            <ShieldAlert className="inline h-4 w-4 text-destructive ml-1" />
            هذا الجهاز للمراقبة والتنبيه فقط. لا تتخذوا قرارات علاجية بناءً عليه وحده — اتبعوا دائماً
            تعليمات الفريق الطبي المعالج.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">أسئلة يكررها الأهالي</h3>
          <Accordion type="single" collapsible className="rounded-2xl border border-border bg-card px-4">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`faq-${i}`}>
                <AccordionTrigger className="text-right text-sm font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-loose">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        </div>
        )}

        {showFrio && (
        <div className="space-y-8">
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-7 space-y-6 shadow-[var(--shadow-soft)]">
          <div className="space-y-3">
            <span className="inline-block rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              تجربة (٢) — حافظة الإنسولين أثناء الخروج والسفر
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success ms-2">
              ✓ جُرّب من أحد الأهالي
            </span>
            <h2 className="text-2xl font-bold">حل بسيط لحمل الإنسولين بعيدًا عن حرارة الجو</h2>
          </div>

          <figure className="mx-auto w-full max-w-[220px] sm:max-w-[260px]">
            <img
              src={frioCase.url}
              alt="حافظة FRIO لتبريد الإنسولين باللون الأخضر مع البطانة الداخلية"
              loading="lazy"
              className="aspect-square w-full rounded-2xl border border-border bg-muted/30 object-contain p-3"
            />
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              FRIO Individual Insulin Cooling Wallet
            </figcaption>
          </figure>

          <div className="space-y-3 text-muted-foreground leading-loose">
            <p>
              من الأشياء التي وجدناها مفيدة جدًا في الاستخدام اليومي والسفر حافظة FRIO للإنسولين.
            </p>
            <p>
              فكرتها بسيطة: تُفعّل بالماء وتساعد على حماية الإنسولين من الحرارة أثناء التنقل، دون
              الحاجة إلى كهرباء أو أكياس ثلج.
            </p>
            <p>
              بالنسبة لنا كانت مريحة خصوصًا في السفر والمشاوير الطويلة، لأنها خففت علينا التفكير
              المستمر في كيفية حفظ قلم الإنسولين أثناء وجودنا خارج المنزل.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">لماذا وجدناها مفيدة؟</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {frioBenefits.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-4 flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-base">
                  {f.emoji}
                </span>
                <div>
                  <div className="font-semibold">{f.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">تجربتنا</h3>
          <div className="rounded-2xl bg-primary-soft/60 border-r-4 border-primary p-4 sm:p-5 space-y-3 text-sm leading-loose text-foreground">
            <p>
              استخدمناها لحمل قلم الإنسولين أثناء الخروج والسفر، وأصبحت من الأشياء التي نحرص على
              وجودها معنا.
            </p>
            <p>
              أكثر ما أعجبنا فيها أنها بسيطة جدًا؛ لا نحتاج تجهيز أكياس ثلج أو البحث باستمرار عن
              ثلاجة. عند الحاجة نقوم بتفعيل الحافظة بالماء حسب تعليماتها ونستخدمها أثناء التنقل.
            </p>
            <p>
              بالنسبة لنا هي من الأشياء الصغيرة التي جعلت التعامل اليومي مع الإنسولين أسهل.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold">متى وجدناها مفيدة أكثر؟</h3>
          <ul className="flex flex-wrap gap-2 text-sm">
            {frioMoments.map((m) => (
              <li
                key={m}
                className="rounded-full border border-border bg-card px-3 py-1.5 font-medium text-muted-foreground"
              >
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <div className="rounded-2xl bg-warning/10 border-r-4 border-warning p-4 text-sm leading-loose text-foreground space-y-2">
            <strong className="block">ملاحظة مهمة</strong>
            <p>
              هذه تجربة شخصية من أحد الأهالي وليست إعلانًا أو توصية طبية، ولا توجد أي علاقة تجارية
              بين منصة سما والشركة المصنعة أو البائع.
            </p>
            <p>
              حافظة FRIO ليست ثلاجة، ولا ينبغي وصفها بأنها تقوم بتبريد الإنسولين إلى درجة حرارة
              الثلاجة.
            </p>
            <p>
              يجب الالتزام دائمًا بتعليمات الشركة المصنعة للحافظة، وتعليمات الشركة المصنعة للإنسولين
              بشأن درجات الحرارة وطريقة الحفظ.
            </p>
            <p>
              وفي حال وجود أي شك حول صلاحية الإنسولين بعد تعرضه للحرارة، يجب الرجوع إلى الصيدلي أو
              الفريق الطبي المعالج.
            </p>
          </div>

          <div className="text-center space-y-2">
            <a
              href="https://www.amazon.sa/dp/B0002262BW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 min-h-11 text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              مشاهدة المنتج الذي استخدمناه على Amazon
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              الرابط للمساعدة في الوصول إلى نفس المنتج الذي جُرّب فقط. منصة سما لا تحصل على أي عمولة
              من الشراء.
            </p>
          </div>
        </section>
        </div>
        )}


        <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
          <Link
            to="/simplified-guide"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 min-h-11 text-sm font-semibold hover:bg-muted transition-colors"
          >
            العودة إلى الدليل المبسّط
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 min-h-11 text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            عن المنصة والمصادر
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
