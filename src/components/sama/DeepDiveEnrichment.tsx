import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Printer, Wrench } from "lucide-react";

/**
 * أدوات عملية للأسرة.
 *
 * بعد ترقية المواضيع المعرفية إلى دروس أساسية ضمن الـ36،
 * لم يبق هنا إلا ما له قيمة وظيفية حقيقية: قالب يُنسخ، وقائمة تُطبع.
 * الشرح التعليمي المطوّل صار في درس «كيف أتواصل مع فريق السكري بوضوح؟».
 */

const doctorTemplate = `السلام عليكم،
أحتاج توجيهكم بخصوص قراءة السكر لدى الطفل.

- عمر الطفل:
- آخر 3 قراءات للسكر:
  1.
  2.
  3.
- هل يستخدم حساسًا؟ نعم / لا
- هل القراءة من الحساس أو من وخز الإصبع؟
- وقت آخر وجبة:
- ماذا أكل تقريبًا؟
- وقت آخر جرعة إنسولين:
- نوع الإنسولين:
- هل توجد كيتونات؟ لا / خفيفة / متوسطة / عالية / لم يتم الفحص
- هل يوجد مرض أو حرارة؟ نعم / لا
- هل يوجد قيء؟ نعم / لا
- حالة الطفل الآن: واعٍ / متعب / نائم / لا يستطيع الشرب / يتنفس بصعوبة
- هل شرب سوائل؟ نعم / لا
- هل يوجد نشاط أو لعب قبل القراءة؟ نعم / لا

نرجو توجيهنا حسب خطة الطفل.`;

function CopyTemplateButton() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(doctorTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 min-h-11 text-sm font-semibold hover:bg-primary/90 transition-colors"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "تم النسخ" : "نسخ القالب"}
    </button>
  );
}

function PrintQuestionsButton({ targetId }: { targetId: string }) {
  const onPrint = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(targetId);
    if (el) {
      // نطاق طباعة موثوق يعمل داخل متصفحات الجوال و PWA
      document.body.classList.add("printing-scope");
      el.classList.add("print-target");
      const cleanup = () => {
        document.body.classList.remove("printing-scope");
        el.classList.remove("print-target");
        window.removeEventListener("afterprint", cleanup);
      };
      window.addEventListener("afterprint", cleanup);
    }
    window.print();
  };
  return (
    <button
      type="button"
      onClick={onPrint}
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 min-h-11 text-sm font-semibold hover:bg-primary/90 transition-colors"
    >
      <Printer className="h-4 w-4" />
      طباعة الأسئلة
    </button>
  );
}

type Item = {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
};

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm sm:text-base leading-loose text-foreground/90">{children}</p>;
}

function H({ children }: { children: React.ReactNode }) {
  return <h4 className="font-bold text-sm sm:text-base text-foreground">{children}</h4>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="flex items-start gap-2 text-sm sm:text-base leading-loose text-foreground/90"
        >
          <span
            aria-hidden
            className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0"
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

const appointmentQuestions = [
  {
    h: "أسئلة عن السكر",
    q: [
      "ما نطاق السكر المناسب لطفلي في هذه المرحلة؟",
      "متى أعتبر القراءة منخفضة؟ ومتى أعتبرها مرتفعة تحتاج متابعة؟",
      "متى أحتاج إعادة القياس؟",
      "هل أستخدم الحساس فقط أم أؤكد بالوخز في بعض الحالات؟",
    ],
  },
  {
    h: "أسئلة عن الهبوط",
    q: [
      "كيف أعالج الهبوط لطفلي؟",
      "ما كمية السكر السريع المناسبة حسب عمره وخطته؟",
      "متى أعيد القياس بعد علاج الهبوط؟",
      "متى أستخدم الجلوكاجون؟ وماذا أفعل إذا لم يستطع البلع؟",
    ],
  },
  {
    h: "أسئلة عن الارتفاع والكيتونات",
    q: [
      "متى أفحص الكيتونات؟ وماذا أفعل إذا ظهرت؟",
      "متى أذهب للطوارئ؟",
      "هل أوقف الرياضة عند وجود كيتونات؟",
      "ماذا أفعل إذا كان هناك قيء مع ارتفاع السكر؟",
    ],
  },
  {
    h: "أسئلة عن الإنسولين",
    q: [
      "ما الفرق بين أنواع الإنسولين المستخدمة لطفلي؟",
      "ماذا أفعل إذا نسي الطفل جرعة؟ أو لم يأكل بعد الجرعة؟",
      "متى تتم مراجعة الجرعات؟",
    ],
  },
  {
    h: "أسئلة عن المدرسة",
    q: [
      "ما الذي يجب أن تعرفه المدرسة؟",
      "هل يحتاج الطفل خطة مكتوبة للمدرسة؟",
      "كيف تتصرف المدرسة عند الهبوط؟ ومتى تتصل بالأسرة أو الإسعاف؟",
    ],
  },
  {
    h: "أسئلة عن الحياة اليومية",
    q: [
      "كيف نتعامل مع الرياضة والمطاعم؟",
      "كيف نحفظ الإنسولين خارج البيت؟",
      "ماذا نضع في حقيبة السكري؟",
      "كيف نساعد الطفل نفسيًا دون تخويف؟",
    ],
  },
];

const printFields = [
  "اسم الطفل",
  "تاريخ الموعد",
  "اسم الطبيب / العيادة",
  "اسم المرافق",
];

function PrintableAppointmentSheet() {
  return (
    <div id="print-first-appointment" className="sama-print-sheet" aria-hidden>
      <div className="sama-print-header">
        <img src={samaLogo.url} alt="" />
        <div>
          <div className="sama-print-brand">سما — رحلة التعايش مع السكري من النوع الأول</div>
          <div className="sama-print-title">أسئلة مهمة لأول موعد بعد التشخيص</div>
          <div className="sama-print-sub">ورقة مساعدة للأسرة أثناء الموعد الطبي</div>
        </div>
        <div className="sama-print-url">t1d-ar.com</div>
      </div>

      <div className="sama-print-fields">
        {printFields.map((f) => (
          <div key={f} className="sama-print-field">
            <span>{f}:</span>
            <span />
          </div>
        ))}
      </div>

      {appointmentQuestions.map((sec) => (
        <div key={sec.h} className="sama-print-section">
          <div className="sama-print-section-title">{sec.h}</div>
          {sec.q.map((q) => (
            <div key={q} className="sama-print-q">
              <div className="sama-print-q-text">{q}</div>
              <div className="sama-print-line" />
              <div className="sama-print-line" />
              {q.length > 45 && <div className="sama-print-line" />}
            </div>
          ))}
        </div>
      ))}

      <div className="sama-print-footer">
        <span>منصة سما — t1d-ar.com</span>
        <span>هذه الورقة للتنظيم وتدوين الملاحظات، ولا تغني عن توجيه الفريق الطبي.</span>
      </div>
    </div>
  );
}

const items: Item[] = [
  {
    id: "message-to-doctor",
    title: "ماذا أرسل للطبيب عندما أحتاج توجيهًا؟",
    subtitle: "قالب جاهز للنسخ والإرسال",
    content: (
      <div className="space-y-3">
        <P>
          انسخوا القالب، واملؤوه، وأرسلوه كما هو. شرح سبب أهمية كل حقل تجدونه في درس{" "}
          <Link
            to="/simplified-guide"
            search={{ ch: 1, lesson: 4 }}
            className="text-primary font-semibold underline"
          >
            «كيف أتواصل مع فريق السكري بوضوح؟»
          </Link>
          .
        </P>
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-loose text-foreground/90">
            {doctorTemplate}
          </pre>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyTemplateButton />
        </div>
      </div>
    ),
  },
  {
    id: "first-appointment-questions",
    title: "أسئلة مهمة لأول موعد بعد التشخيص",
    subtitle: "قائمة جاهزة للطباعة",
    content: (
      <div className="space-y-3">
        <P>
          خذوا هذه الأسئلة معكم للموعد. عند الطباعة ستحصلون على نموذج A4 فيه مساحة للكتابة بالقلم
          بعد كل سؤال.
        </P>
        <div className="space-y-4">
          {appointmentQuestions.map((sec) => (
            <div key={sec.h} className="space-y-1.5">
              <H>{sec.h}</H>
              <UL items={sec.q} />
            </div>
          ))}
        </div>
        <PrintableAppointmentSheet />
        <div className="flex flex-wrap gap-2 pt-1">
          <PrintQuestionsButton targetId="print-first-appointment" />
        </div>
        <P>
          لا يلزم أن تسألوا كل شيء في موعد واحد. اختاروا أهم الأسئلة الآن، واجعلوا البقية للمراجعات
          القادمة.
        </P>
      </div>
    ),
  },
];

export function DeepDiveEnrichment() {
  return (
    <section
      id="deep-dive"
      className="rounded-3xl border border-primary/20 bg-card p-5 sm:p-8 space-y-5 shadow-[var(--shadow-card)] print:break-inside-avoid"
    >
      <header className="space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary border border-primary/20">
          <Wrench className="h-3.5 w-3.5" />
          أدوات جاهزة
        </span>
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">قوالب تُنسخ وقوائم تُطبع</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-loose">
            أداتان تستخدمونهما وقت الحاجة: رسالة جاهزة للفريق الطبي، وقائمة أسئلة لأول موعد. الشرح
            التعليمي كاملًا موجود في دروس الدليل المبسّط.
          </p>
        </div>
      </header>

      <Accordion type="single" collapsible className="w-full space-y-2">
        {items.map((it) => (
          <AccordionItem
            key={it.id}
            value={it.id}
            className="rounded-2xl border border-border bg-background/60 px-4 data-[state=open]:border-primary/40"
          >
            <AccordionTrigger className="text-right hover:no-underline py-4">
              <span className="flex flex-col items-start gap-0.5 text-right">
                <span className="text-base sm:text-lg font-bold text-foreground">{it.title}</span>
                {it.subtitle && (
                  <span className="text-xs text-muted-foreground">{it.subtitle}</span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-1">
              <div className="space-y-3 border-t border-border/60 pt-4">{it.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-xs text-muted-foreground leading-loose border-t border-border/60 pt-3">
        هذه الأدوات للتثقيف والدعم، ولا تغني عن مراجعة الطبيب أو فريق السكري. تختلف الخطط من طفل
        لآخر حسب العمر والوزن ونوع الإنسولين والقراءات والنشاط والحالة الصحية.
      </p>
    </section>
  );
}
