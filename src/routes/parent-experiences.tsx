import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
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
          "تجارب واجتهادات شخصية من أهالي أطفال سكري النوع الأول: شرح جهاز SugarPixel لمتابعة السكر لحظياً، وطريقة ربطه وتنبيهاته.",
      },
      { property: "og:title", content: "تجارب أهالي مفيدة — سما" },
      {
        property: "og:description",
        content:
          "تجارب أهالي عملية مع أجهزة ومتابعة سكر الأطفال، مُعاد صياغتها بلغة مبسطة داخل منصة سما.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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

function ParentExperiencesPage() {
  const [tab, setTab] = useState<keyof typeof steps>("dexcom");
  const active = steps[tab];

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
