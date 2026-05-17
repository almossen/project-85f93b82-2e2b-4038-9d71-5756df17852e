import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckSquare,
  Clock,
  Droplet,
  Gauge,
  Lightbulb,
  Phone,
  Printer,
  RotateCcw,
  School,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Thermometer,
  Wifi,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { AskDoctorReminder } from "@/components/sama/AskDoctorReminder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import insulinRapidImg from "@/assets/insulin-rapid.jpg";
import insulinLongImg from "@/assets/insulin-long.jpg";
import penHumalog from "@/assets/pen-humalog.jpg";
import penNovorapid from "@/assets/pen-novorapid.jpg";
import penApidra from "@/assets/pen-apidra.jpg";
import penFiasp from "@/assets/pen-fiasp.jpg";
import penLantus from "@/assets/pen-lantus.jpg";
import penToujeo from "@/assets/pen-toujeo.jpg";
import penLevemir from "@/assets/pen-levemir.jpg";
import penTresiba from "@/assets/pen-tresiba.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type BrandInfo = { name: string; ar: string; img: string; note: string };

const rapidBrands: BrandInfo[] = [
  { name: "Humalog", ar: "هيومالوج", img: penHumalog, note: "إنسولين ليسبرو — سريع المفعول، يُعطى عند الوجبات بتوجيه الطبيب." },
  { name: "NovoRapid", ar: "نوفورابيد", img: penNovorapid, note: "إنسولين أسبارت — سريع المفعول، شائع الاستخدام عند الوجبات." },
  { name: "Apidra", ar: "أبيدرا", img: penApidra, note: "إنسولين جلوليزين — سريع المفعول." },
  { name: "Fiasp", ar: "فياسب", img: penFiasp, note: "أسبارت فائق السرعة — يبدأ مفعوله أسرع من نوفورابيد." },
];

const longBrands: BrandInfo[] = [
  { name: "Lantus", ar: "لانتوس", img: penLantus, note: "إنسولين جلارجين U-100 — طويل المفعول، مرة يومياً غالباً." },
  { name: "Toujeo", ar: "توجيو", img: penToujeo, note: "إنسولين جلارجين U-300 — مركّز أكثر ومفعول أطول." },
  { name: "Levemir", ar: "ليفيمير", img: penLevemir, note: "إنسولين ديتيمير — طويل المفعول، قد يُعطى مرة أو مرتين يومياً." },
  { name: "Tresiba", ar: "تريسيبا", img: penTresiba, note: "إنسولين ديجلوديك — مفعول يمتد لأكثر من ٢٤ ساعة." },
];

function BrandChip({ brand }: { brand: BrandInfo }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium hover:bg-primary-soft hover:border-primary/40 hover:text-primary transition-colors cursor-pointer"
        >
          {brand.name} — {brand.ar}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="text-right">
          <DialogTitle>{brand.name} — {brand.ar}</DialogTitle>
          <DialogDescription className="leading-loose">{brand.note}</DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
          <img
            src={brand.img}
            alt={`رسم توضيحي لقلم ${brand.ar}`}
            width={768}
            height={512}
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </div>
        <p className="text-[11px] text-muted-foreground text-right leading-loose">
          الصورة توضيحية فقط ولا تمثّل تصميم العلامة التجارية الفعلي. اختيار النوع قرار طبي.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export const Route = createFileRoute("/module/first-days")({
  head: () => ({
    meta: [
      { title: "الأيام الأولى بعد التشخيص — سما" },
      {
        name: "description",
        content:
          "وحدة تعليمية لأولياء الأمور: ما الذي سيستخدمه طفلي يومياً بعد تشخيص سكري النوع الأول — الإنسولين، القياس، الحقن، الحفظ، وحقيبة السكري.",
      },
    ],
  }),
  component: ModuleFirstDays,
});

type LessonIcon = typeof Syringe;

type Lesson = {
  num: string;
  title: string;
  icon: LessonIcon;
  intro: string;
  points: string[];
  ask: string;
};

const lessons: Lesson[] = [
  {
    num: "٠١",
    title: "ما هي الأشياء التي سيستخدمها طفلي يومياً؟",
    icon: CheckSquare,
    intro:
      "في الأيام الأولى ستتعرّفون على عدد محدود من الأدوات. لا داعي لتعلّمها كلها في يوم واحد — الفريق الطبي سيشرحها لكم خطوة بخطوة.",
    points: [
      "الإنسولين (يحدد نوعه وجرعته الطبيب).",
      "أقلام أو محاقن الإنسولين، أو مضخة في بعض الحالات.",
      "جهاز قياس السكر بالوخز، أو حساس متصل بالجسم.",
      "شرائط القياس وإبر الوخز للأصابع.",
      "وجبة سريعة لرفع السكر عند الانخفاض (عصير، تمر، أقراص جلوكوز).",
      "بطاقة تعريف بسيطة تذكر أن الطفل لديه سكري نوع أول.",
    ],
    ask: "اطلب من فريقك الطبي قائمة مكتوبة بأسماء الأدوات التي تخص طفلك تحديداً.",
  },
  {
    num: "٠٢",
    title: "ما هو الإنسولين؟",
    icon: Droplet,
    intro:
      "الإنسولين هرمون طبيعي يفرزه البنكرياس ليساعد الجسم على استخدام السكر للطاقة. في سكري النوع الأول، يتوقف البنكرياس عن إنتاجه، فيُعطى من الخارج عن طريق الحقن.",
    points: [
      "ليس دواءً اختيارياً — هو علاج أساسي ضروري للحياة.",
      "يحدد الطبيب نوعه، جرعته، وأوقاته بحسب حالة كل طفل.",
      "الجرعة قد تتغير مع الوقت، ولا تُغيَّر إلا بتوجيه طبي.",
    ],
    ask: "اسأل طبيبك: ما هو نوع الإنسولين الذي وصفته لطفلي ولماذا اخترته؟",
  },
  {
    num: "٠٣",
    title: "ما هو الإنسولين سريع المفعول؟",
    icon: Clock,
    intro:
      "نوع من الإنسولين يبدأ مفعوله بسرعة ويستمر لفترة قصيرة. يُستخدم عادة عند الوجبات لتغطية السكر القادم من الطعام، أو لتصحيح ارتفاع السكر — بتوجيه الطبيب.",
    points: [
      "يُعطى عادة قبل أو مع الوجبة بحسب تعليمات الفريق الطبي.",
      "الجرعة تعتمد على وزن الطفل ونوع الوجبة وقراءة السكر.",
      "لا يُعطى عشوائياً، ولا يُحسب من قِبَل الأهل بدون خطة من الطبيب.",
    ],
    ask: "اطلب من الطبيب خطة مكتوبة: متى يُعطى، وكم الجرعة، وماذا نفعل لو نسيناه؟",
  },
  {
    num: "٠٤",
    title: "ما هو الإنسولين طويل المفعول؟",
    icon: Thermometer,
    intro:
      "نوع آخر من الإنسولين يعمل ببطء وعلى مدى طويل (عادة 24 ساعة). يُعطى مرة أو مرتين في اليوم ليؤمّن للجسم حاجة أساسية مستمرة من الإنسولين بين الوجبات وأثناء النوم.",
    points: [
      "يُعطى في وقت ثابت يومياً بحسب وصفة الطبيب.",
      "لا يُستخدم لتصحيح ارتفاعات مفاجئة في السكر.",
      "تأخير وقته أو نسيانه قد يرفع السكر — أبلغوا الفريق الطبي فوراً.",
    ],
    ask: "اسأل الطبيب: ما هو أفضل وقت يومي لإعطاء الإنسولين طويل المفعول لطفلي؟",
  },
  {
    num: "٠٥",
    title: "ما هو المنظّم؟ وهل يستخدم في سكري النوع الأول؟",
    icon: ShieldAlert,
    intro:
      "«المنظّم» مصطلح يُطلق غالباً على أدوية فموية (مثل الميتفورمين) تُستخدم في سكري النوع الثاني لتحسين استجابة الجسم للإنسولين. لكنها لا تُغني عن الإنسولين في سكري النوع الأول.",
    points: [
      "سكري النوع الأول = نقص كامل في إنتاج الإنسولين، فالعلاج الأساسي هو الإنسولين نفسه.",
      "حبوب المنظّم وحدها لا تكفي ولا تُستخدم بديلاً عن الإنسولين هنا.",
      "في حالات نادرة جداً قد يضيفها الطبيب كعلاج مساعد، لكن القرار طبي بحت.",
    ],
    ask: "إذا سمعتم نصيحة بأخذ المنظّم بدل الإنسولين، استشيروا طبيبكم قبل أي تغيير.",
  },
  {
    num: "٠٦",
    title: "طريقة حقن الإنسولين: ما الذي يجب أن أعرفه؟",
    icon: Syringe,
    intro:
      "الحقن يتم تحت الجلد (وليس في العضلة أو الوريد). الفريق الطبي أو ممرضة السكري سيدرّبكم عملياً على الطريقة الصحيحة قبل الخروج من المستشفى.",
    points: [
      "أماكن الحقن المعتادة: البطن، الفخذ الخارجي، أعلى الذراع، الأرداف.",
      "غيّروا مكان الحقن في كل مرة لتجنّب تصلّب الجلد.",
      "استخدموا إبرة جديدة في كل حقنة.",
      "تأكدوا من نوع الإنسولين والجرعة قبل الحقن مرتين.",
    ],
    ask: "اطلب من ممرضة السكري جلسة تدريب عملي، وفيديو مرجعي تعودون إليه في البيت.",
  },
  {
    num: "٠٧",
    title: "كيف أحفظ الإنسولين؟",
    icon: Thermometer,
    intro:
      "الإنسولين دواء حساس للحرارة. الحفظ الصحيح يحافظ على فعاليته ويحمي طفلكم.",
    points: [
      "القلم/القارورة غير المستخدمة: في الثلاجة بين 2 و 8 درجة مئوية، لا في الفريزر.",
      "القلم قيد الاستخدام: في درجة حرارة الغرفة (أقل من 30°)، بعيداً عن الشمس.",
      "لا تستخدموا الإنسولين إذا تغيّر لونه أو ظهرت فيه شوائب.",
      "عند السفر: حقيبة تبريد مخصصة، وتجنّب وضعه في شنطة السيارة الحارة.",
    ],
    ask: "اسأل الصيدلي: كم يوماً يبقى القلم صالحاً بعد فتحه؟",
  },
  {
    num: "٠٨",
    title: "ما هو جهاز قياس السكر أو الحساس؟",
    icon: Gauge,
    intro:
      "قياس السكر يساعدنا على متابعة حالة الطفل واتخاذ القرار الصحيح بتوجيه الطبيب. هناك طريقتان شائعتان:",
    points: [
      "جهاز القياس بالوخز (Glucometer): وخزة بسيطة في الإصبع وقطرة دم على شريط.",
      "الحساس المستمر (CGM): جهاز صغير يُلصق على الجلد ويرسل القراءة للجوال.",
      "الفريق الطبي سيحدد متى يُقاس السكر وكم مرة في اليوم.",
      "سجّلوا القراءات في دفتر أو تطبيق لمشاركتها مع الطبيب.",
    ],
    ask: "اسأل طبيبك: ما هي القراءات المستهدفة لطفلي، ومتى أتصل بكم؟",
  },
  {
    num: "٠٩",
    title: "ماذا يجب أن أحمل معي دائمًا؟",
    icon: School,
    intro:
      "«حقيبة السكري» ترافق الطفل في كل مكان: المدرسة، السوق، الرحلات، بيت الجدّة. تجهيزها مرة يوفّر عليكم الكثير لاحقاً.",
    points: [
      "جهاز قياس السكر + شرائط + إبر وخز.",
      "قلم الإنسولين + إبر جديدة (في حقيبة تبريد إذا الجو حار).",
      "وجبة سريعة لرفع السكر: عصير صغير، تمر، أقراص جلوكوز.",
      "وجبة خفيفة (بسكويت، تمر، حليب).",
      "بطاقة تعريف بحالة الطفل وأرقام الطوارئ.",
      "ماء كافٍ، ومناديل تعقيم.",
    ],
    ask: "اطلب من الفريق الطبي مراجعة محتويات حقيبتكم في أول زيارة متابعة.",
  },
  {
    num: "١٠",
    title: "متى أطلب المساعدة فورًا؟",
    icon: Phone,
    intro:
      "بعض العلامات تستدعي الاتصال بالطبيب أو الذهاب للطوارئ فوراً، دون انتظار. احفظوا رقم الفريق الطبي في مكان واضح.",
    points: [
      "فقدان الوعي أو صعوبة في إيقاظ الطفل.",
      "تشنّجات أو ارتباك شديد.",
      "قيء متكرر مع رفض الأكل والشرب.",
      "تنفّس سريع وعميق، أو رائحة فواكه من الفم.",
      "انخفاض سكر شديد لا يرتفع بعد إعطاء سكر سريع.",
      "أي قلق شديد لديكم — لا تترددوا في الاتصال.",
    ],
    ask: "اطلب من الطبيب رقم طوارئ مباشر للسكري، واكتبه على الثلاجة.",
  },
];

type Myth = { claim: string; truth: boolean; explanation: string };

const myths: Myth[] = [
  {
    claim: "إذا تحسّنت القراءة أوقف الإنسولين.",
    truth: false,
    explanation:
      "خطأ. تحسّن القراءة لا يعني أن الجسم بدأ يفرز الإنسولين من جديد. إيقاف الإنسولين قد يؤدي إلى ارتفاع شديد في السكر وحدوث حموضة (كيتونات). لا توقفوه إلا بتوجيه الطبيب.",
  },
  {
    claim: "المنظّم يغني عن الإنسولين في سكري النوع الأول.",
    truth: false,
    explanation:
      "خطأ. سكري النوع الأول نقص كامل في إنتاج الإنسولين، وحبوب المنظّم لا تكفي. الإنسولين هو العلاج الأساسي ولا يُستبدل.",
  },
  {
    claim: "كل أدوية السكري تناسب كل الأنواع.",
    truth: false,
    explanation:
      "خطأ. أدوية النوع الثاني قد لا تكون مناسبة للنوع الأول، والعكس. الطبيب هو من يختار العلاج الصحيح لكل حالة.",
  },
  {
    claim: "لا أغيّر الجرعة إلا بتوجيه الطبيب.",
    truth: true,
    explanation:
      "صح. تغيير الجرعة من تلقاء النفس قد يسبّب انخفاضاً أو ارتفاعاً خطيراً. كل تعديل يكون بعد التواصل مع الفريق الطبي.",
  },
];

const checklist = [
  "جهاز قياس السكر",
  "شرائط قياس كافية (٢٠ شريطة على الأقل)",
  "إبر وخز نظيفة",
  "قلم إنسولين سريع المفعول + إبر جديدة",
  "قلم إنسولين طويل المفعول (إذا كان وقت الجرعة قريباً)",
  "حقيبة تبريد صغيرة في الأيام الحارة",
  "عصير صغير أو أقراص جلوكوز (لرفع السكر السريع)",
  "تمر أو وجبة خفيفة (بسكويت، حليب)",
  "ماء كافٍ",
  "مناديل تعقيم",
  "بطاقة تعريف بحالة الطفل",
  "ورقة مكتوب فيها رقم الطبيب والطوارئ",
  "دفتر تسجيل القراءات أو تطبيق على الجوال",
];

function MythCard({ myth, idx }: { myth: Myth; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="group text-right rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-all min-h-[200px] flex flex-col justify-between"
      aria-label={`بطاقة مفهوم رقم ${idx + 1}`}
    >
      {!flipped ? (
        <>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">بطاقة #{idx + 1}</span>
            <RotateCcw className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-base leading-loose">«{myth.claim}»</p>
          <p className="text-xs text-primary mt-3 font-medium">صح أم خطأ؟ اضغط لكشف الإجابة ←</p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            {myth.truth ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 text-success px-2.5 py-1 text-xs font-semibold">
                <Check className="h-3.5 w-3.5" /> صح
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 text-destructive px-2.5 py-1 text-xs font-semibold">
                <X className="h-3.5 w-3.5" /> خطأ
              </span>
            )}
          </div>
          <p className="text-sm leading-loose text-foreground/90">{myth.explanation}</p>
          <p className="text-xs text-muted-foreground mt-3">اضغط للعودة</p>
        </>
      )}
    </button>
  );
}

function ModuleFirstDays() {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 text-right space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                الدرس ٠٢ — الوحدة الأولى
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur border border-border px-3 py-1 text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                بانتظار الاعتماد الطبي
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur border border-border px-3 py-1 text-xs font-medium">
                <Clock className="h-3.5 w-3.5" />
                ١٠ دروس قصيرة
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.2]">
              الأيام الأولى بعد التشخيص
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-loose max-w-2xl">
              ماذا يجب أن يعرف ولي الأمر؟ — تعرّفوا على الأدوات والمفاهيم التي ستقابلونها في أيامكم الأولى مع سكري النوع الأول، بلغة بسيطة ومحتوى توعوي فقط.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 space-y-14">
          {/* Safety disclaimer */}
          <aside className="rounded-3xl border-2 border-destructive/30 bg-destructive/5 p-6 sm:p-7 flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/15 text-destructive shrink-0">
              <AlertTriangle className="h-6 w-6" strokeWidth={2} />
            </div>
            <div className="space-y-2">
              <h2 className="font-bold text-lg">تنبيه طبي مهم</h2>
              <p className="text-sm sm:text-base leading-loose text-foreground/90">
                هذا المحتوى للتوعية فقط. نوع الإنسولين، الجرعات، أوقات الاستخدام، وطريقة التصحيح يحددها الطبيب أو فريق السكري.
                <span className="font-semibold"> لا تغيّر الجرعة أو توقيت الإنسولين من نفسك.</span>
              </p>
            </div>
          </aside>

          {/* Quick overview icons */}
          <section className="space-y-5">
            <header className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">ما الذي سنتعرّف عليه؟</h2>
              <p className="text-muted-foreground">خمس أدوات أساسية ستقابلونها في أيامكم الأولى.</p>
            </header>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { icon: Droplet, label: "الإنسولين" },
                { icon: Gauge, label: "جهاز القياس" },
                { icon: Wifi, label: "الحساس" },
                { icon: Phone, label: "الطوارئ" },
                { icon: School, label: "حقيبة السكري" },
              ].map((it) => (
                <div
                  key={it.label}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)]"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary mb-2">
                    <it.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold">{it.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Lessons */}
          <section className="space-y-5">
            <header className="space-y-2 text-right">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">دروس الوحدة</h2>
              <p className="text-muted-foreground leading-loose">
                اضغطوا على كل بطاقة لقراءة الدرس. كل درس قصير وينتهي بـ«اسأل طبيبك».
              </p>
            </header>

            <Accordion type="single" collapsible className="space-y-3">
              {lessons.map((l) => (
                <AccordionItem
                  key={l.num}
                  value={l.num}
                  className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-4 text-right flex-1">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary shrink-0">
                        <l.icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-muted-foreground mb-0.5">
                          الدرس {l.num}
                        </div>
                        <div className="font-semibold text-base leading-snug">{l.title}</div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <div className="space-y-4 pt-2 border-t border-border">
                      <p className="text-sm sm:text-base leading-loose text-foreground/90 pt-3">
                        {l.intro}
                      </p>
                      <ul className="space-y-2">
                        {l.points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm leading-loose">
                            <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-2xl bg-sand/40 border border-sand p-4 flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-sand-foreground shrink-0">
                          <Stethoscope className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-sand-foreground mb-1">
                            اسأل طبيبك
                          </div>
                          <p className="text-sm leading-loose text-sand-foreground/90">{l.ask}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Insulin brands in the market */}
          <section className="space-y-5">
            <header className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                أنواع تجارية شائعة في السوق
              </h2>
              <p className="text-muted-foreground leading-loose">
                صور توضيحية لأقلام الإنسولين، مع أشهر الأسماء التجارية المتوفرة في الصيدليات السعودية. الطبيب وحده هو من يحدّد النوع المناسب لطفلك.
              </p>
            </header>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Rapid-acting */}
              <article className="rounded-3xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] flex flex-col">
                <div className="aspect-[16/10] bg-mint/30 overflow-hidden">
                  <img
                    src={insulinRapidImg}
                    alt="رسم توضيحي لأقلام الإنسولين سريع المفعول"
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6 space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-2.5 py-1 text-xs font-bold">
                      <Clock className="h-3.5 w-3.5" />
                      سريع المفعول
                    </span>
                  </div>
                  <h3 className="font-bold text-lg leading-snug">إنسولين سريع المفعول</h3>
                  <p className="text-sm text-muted-foreground leading-loose">
                    يُستخدم عند الوجبات بتوجيه الطبيب. اضغط على الاسم لرؤية صورة القلم:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {rapidBrands.map((b) => (
                      <BrandChip key={b.name} brand={b} />
                    ))}
                  </div>
                </div>
              </article>

              {/* Long-acting */}
              <article className="rounded-3xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] flex flex-col">
                <div className="aspect-[16/10] bg-sand/40 overflow-hidden">
                  <img
                    src={insulinLongImg}
                    alt="رسم توضيحي لأقلام الإنسولين طويل المفعول"
                    width={1024}
                    height={640}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 sm:p-6 space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sand text-sand-foreground px-2.5 py-1 text-xs font-bold">
                      <Thermometer className="h-3.5 w-3.5" />
                      طويل المفعول
                    </span>
                  </div>
                  <h3 className="font-bold text-lg leading-snug">إنسولين طويل المفعول</h3>
                  <p className="text-sm text-muted-foreground leading-loose">
                    يُعطى في وقت ثابت يومياً ليؤمّن حاجة الجسم الأساسية. اضغط على الاسم لرؤية صورة القلم:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {longBrands.map((b) => (
                      <BrandChip key={b.name} brand={b} />
                    ))}
                  </div>
                </div>
              </article>
            </div>

            <aside className="rounded-2xl border border-border bg-muted/40 p-4 flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm leading-loose text-foreground/90">
                الصور توضيحية فقط ولا تمثّل علامة تجارية بعينها. الأسماء مذكورة للتعريف،
                واختيار النوع والجرعة قرار طبي بحت يتخذه فريق السكري المعالج لطفلك.
              </p>
            </aside>
          </section>

          {/* Misconceptions */}
          <section className="space-y-5">
            <header className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                صحّحوا هذه المفاهيم
              </h2>
              <p className="text-muted-foreground">اضغطوا على كل بطاقة لكشف الإجابة الصحيحة.</p>
            </header>
            <div className="grid sm:grid-cols-2 gap-4">
              {myths.map((m, i) => (
                <MythCard key={i} myth={m} idx={i} />
              ))}
            </div>
          </section>

          {/* Printable checklist */}
          <section className="space-y-5 print:bg-white">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)] space-y-5">
              <header className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <CheckSquare className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold">قائمة حقيبة السكري اليومية</h2>
                    <p className="text-sm text-muted-foreground">قائمة قابلة للطباعة — راجعوها قبل الخروج.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors print:hidden"
                >
                  <Printer className="h-4 w-4" />
                  اطبع القائمة
                </button>
              </header>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {checklist.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
                  >
                    <span
                      aria-hidden
                      className="h-5 w-5 rounded border-2 border-muted-foreground/40 shrink-0"
                    />
                    <span className="text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <AskDoctorReminder />

          {/* Nav back */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة إلى رحلة ٣٠ يوم
            </Link>
            <Link
              to="/lesson/$id"
              params={{ id: "1" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              مراجعة الدرس الأول
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />

      <style>{`
        @media print {
          header, nav, footer, button { display: none !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
