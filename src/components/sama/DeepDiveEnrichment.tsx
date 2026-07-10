import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Check,
  Copy,
  Printer,
  Sparkles,
} from "lucide-react";

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
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
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
    if (!el) return window.print();
    const win = window.open("", "_blank", "width=800,height=900");
    if (!win) return;
    win.document.write(
      `<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>أسئلة لأول موعد</title><style>body{font-family:system-ui,Tahoma,Arial;padding:24px;line-height:1.9;color:#111}h3{margin:16px 0 6px}ul{padding-inline-start:20px}li{margin:4px 0}</style></head><body>${el.innerHTML}<p style="color:#555;font-size:12px">— من منصة سما — للاسترشاد فقط.</p></body></html>`
    );
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 250);
  };
  return (
    <button
      type="button"
      onClick={onPrint}
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors"
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
        <li key={t} className="flex items-start gap-2 text-sm sm:text-base leading-loose text-foreground/90">
          <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

const items: Item[] = [
  {
    id: "pattern-not-number",
    title: "فهم النمط… وليس الرقم فقط",
    subtitle: "الرقم مهم، والسياق أهم",
    content: (
      <div className="space-y-3">
        <P>
          في بداية التشخيص، قد تشعر الأسرة أن كل رقم يظهر في جهاز السكر يحتاج إلى تصرّف فوري. لكن
          مع الوقت ستتعلمون أن الرقم مهم، والسياق أهم. قراءة واحدة لا تكفي دائمًا للحكم. المهم أن
          نلاحظ: هل الارتفاع يتكرر بعد وجبة معينة؟ هل الهبوط يحدث بعد اللعب؟
        </P>
        <P>
          لا تغيّروا جرعات الإنسولين بناءً على ملاحظة واحدة أو قراءة واحدة دون الرجوع لفريق السكري.
          دور الأسرة في هذه المرحلة هو الملاحظة والتسجيل والهدوء.
        </P>
        <H>ماذا نلاحظ؟</H>
        <UL
          items={[
            "وقت القراءة.",
            "آخر وجبة تناولها الطفل.",
            "آخر جرعة إنسولين ووقتها.",
            "هل كان هناك لعب أو نشاط؟",
            "هل الطفل مريض أو متوتر أو لم ينم جيدًا؟",
            "هل القراءة تكررت في نفس الوقت خلال أكثر من يوم؟",
          ]}
        />
        <H>مثال مبسّط</H>
        <P>
          إذا ارتفع السكر بعد الفطور مرة واحدة، قد يكون السبب كمية الطعام أو التوقيت. لكن إذا تكرر
          الارتفاع بعد الفطور عدة أيام، فهذه ملاحظة مفيدة تُعرض على فريق السكري.
        </P>
      </div>
    ),
  },
  {
    id: "message-to-doctor",
    title: "ماذا أرسل للطبيب عند اللخبطة؟",
    subtitle: "قالب جاهز للنسخ والإرسال",
    content: (
      <div className="space-y-3">
        <P>
          عند التواصل مع فريق السكري، من الأفضل إرسال معلومات واضحة بدل رسالة عامة مثل «السكر
          مرتفع» أو «السكر نازل». استخدموا هذا القالب عند الحاجة.
        </P>
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-loose text-foreground/90">
{doctorTemplate}
          </pre>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyTemplateButton />
        </div>
        <P>
          كلما كانت المعلومات أوضح، كان توجيه الفريق الطبي أدق. الطبيب لا يحتاج الرقم فقط، بل
          يحتاج القصة حول الرقم.
        </P>
      </div>
    ),
  },
  {
    id: "honeymoon-phase",
    title: "مرحلة التحسن المؤقت بعد التشخيص",
    subtitle: "تحسّن القراءات لا يعني الشفاء",
    content: (
      <div className="space-y-3">
        <P>
          قد تمر بعض الأسر بعد بداية العلاج بفترة تتحسن فيها قراءات السكر، وقد تقل احتياجات الطفل
          من الإنسولين مؤقتًا. هذا لا يعني أن السكري انتهى، ولا يعني إيقاف الإنسولين.
        </P>
        <H>ما المهم أن تعرفه الأسرة؟</H>
        <UL
          items={[
            "تحسن القراءات لا يعني الشفاء.",
            "انخفاض الاحتياج للإنسولين لا يعني إيقافه.",
            "أي تعديل في الجرعات يكون فقط مع فريق السكري.",
            "استمرار المتابعة مهم حتى لو كانت القراءات جيدة.",
            "لا تقارنوا طفلًا بطفل آخر؛ كل جسم يختلف.",
          ]}
        />
        <P>
          إذا تحسنت القراءات، فهذا أمر جيد، لكنه يحتاج متابعة ذكية لا قرارات متسرعة. اسألوا فريق
          السكري: كيف نتصرف إذا بدأت القراءات تنخفض أكثر من المعتاد؟
        </P>
      </div>
    ),
  },
  {
    id: "injection-rotation",
    title: "تدوير أماكن الحقن",
    subtitle: "لماذا لا نستخدم نفس المكان دائمًا",
    content: (
      <div className="space-y-3">
        <P>
          من الأخطاء الشائعة أن يتم الحقن في نفس المكان دائمًا. تكرار الحقن في نفس الموضع قد يسبب
          تكتلات تحت الجلد، وقد يؤثر على امتصاص الإنسولين.
        </P>
        <H>لماذا تدوير أماكن الحقن مهم؟</H>
        <UL
          items={[
            "يساعد على حماية الجلد.",
            "يقلل احتمال ظهور تكتلات.",
            "يساعد على امتصاص الإنسولين بشكل أفضل.",
            "يقلل الألم أو الحساسية في مكان واحد.",
            "يعطي الأسرة روتينًا أوضح للحقن.",
          ]}
        />
        <P>
          اطلبوا من فريق السكري أن يشرح لكم الأماكن المناسبة حسب عمر الطفل، وطريقة سهلة لتدوير
          الأماكن. لا تحقنوا في مكان فيه ألم، تورم، كدمة، أو تكتل إلا بعد سؤال الفريق الطبي.
        </P>
      </div>
    ),
  },
  {
    id: "cgm-vs-symptoms",
    title: "متى لا أعتمد على قراءة الحساس وحدها؟",
    subtitle: "الحساس أداة مفيدة… لكنه لا يحل محل الأعراض",
    content: (
      <div className="space-y-3">
        <P>
          إذا كانت أعراض الطفل لا تتوافق مع الرقم الظاهر، تعاملوا مع الطفل وليس مع الشاشة فقط،
          واتبعوا خطة الفريق الطبي.
        </P>
        <H>حالات قد تحتاج إلى وخز الإصبع</H>
        <UL
          items={[
            "إذا كان الطفل يشعر بأعراض هبوط لكن الحساس لا يظهر انخفاضًا.",
            "إذا ظهرت قراءة منخفضة جدًا أو مرتفعة جدًا بشكل مفاجئ.",
            "إذا كان السهم ينزل أو يرتفع بسرعة.",
            "إذا كان الحساس جديدًا أو قريبًا من الانتهاء.",
            "إذا كان الطفل نائمًا على جهة الحساس وظهرت قراءة انخفاض مفاجئة.",
            "إذا كانت القراءة لا تشبه حالة الطفل.",
          ]}
        />
        <P>
          إذا كان الحساس يعرض قراءة طبيعية، لكن الطفل متعرق ومرتجف وجائع جدًا، لا تتجاهلوا
          الأعراض. افحصوا بالوخز حسب الخطة، وتعاملوا مع الحالة بهدوء.
        </P>
      </div>
    ),
  },
  {
    id: "sleep-night",
    title: "النوم والليل",
    subtitle: "روتين ليلي هادئ بدل الخوف الدائم",
    content: (
      <div className="space-y-3">
        <P>
          الخوف وقت النوم طبيعي جدًا في بداية التشخيص. المطلوب ليس أن تعيش الأسرة في حالة طوارئ كل
          ليلة، بل أن تبني روتينًا واضحًا وآمنًا حسب خطة الطبيب.
        </P>
        <H>روتين ليلي مقترح</H>
        <UL
          items={[
            "تأكدوا من قراءة السكر قبل النوم حسب الخطة.",
            "تأكدوا من عمل تنبيهات الحساس إذا كان الطفل يستخدم حساسًا.",
            "ضعوا مصدر سكر سريع في مكان معروف وقريب.",
            "تأكدوا أن جهاز القياس متوفر إذا احتجتم له.",
            "اسألوا الطبيب: متى نحتاج قياسًا أثناء الليل؟",
          ]}
        />
        <H>متى ننتبه أكثر؟</H>
        <UL
          items={[
            "بعد نشاط بدني قوي في نفس اليوم.",
            "إذا كانت هناك قراءات منخفضة قبل النوم.",
            "إذا أخذ الطفل جرعة قريبة من وقت النوم.",
            "إذا كان الطفل مريضًا أو لم يأكل جيدًا.",
            "إذا كان هناك تغيير جديد في الخطة العلاجية.",
          ]}
        />
      </div>
    ),
  },
  {
    id: "outings-restaurants",
    title: "الخروج والمطاعم والمناسبات",
    subtitle: "الطفل يعيش حياته… مع استعداد بسيط",
    content: (
      <div className="space-y-3">
        <P>
          الهدف ليس منع الطفل، بل مساعدته على المشاركة بأمان وبدون إحراج.
        </P>
        <H>قبل الخروج من البيت</H>
        <UL
          items={[
            "جهاز قياس أو مستلزمات الحساس.",
            "سكر سريع لعلاج الهبوط.",
            "وجبة خفيفة وماء.",
            "الإنسولين إذا كان وقت الخروج طويلًا، مع الإبر.",
            "أرقام التواصل المهمة وخطة مختصرة للطوارئ.",
          ]}
        />
        <H>في المناسبات والعزائم</H>
        <P>
          تجنبوا إحراج الطفل. لا تقولوا أمام الناس: «لا تأكل، أنت عندك سكري». الأفضل استخدام لغة
          هادئة وخاصة مثل: «خلّنا نشوف الكمية ونمشي على الخطة».
        </P>
        <P>الطفل لا يحتاج أن يشعر أنه محروم، بل أن يتعلم تدريجيًا كيف يستمتع بحياته مع وجود خطة.</P>
      </div>
    ),
  },
  {
    id: "words-of-trust",
    title: "كلمات تبني ثقة الطفل",
    subtitle: "طريقة الكلام تؤثر على علاقته بالسكري",
    content: (
      <div className="space-y-3">
        <P>
          الأرقام ليست درجات اختبار، والارتفاع أو الهبوط لا يعني أن الطفل فشل. هي معلومات تساعدنا
          على التصرف.
        </P>
        <div className="grid gap-3">
          {[
            ["ليش سكرك مرتفع؟", "خلّنا نفهم وش صار ونعدّل بهدوء."],
            ["أنت ما انتبهت.", "كلنا نتعلم، والمهم نعرف وش نسوي الآن."],
            ["لا تأكل مثل غيرك.", "تقدر تأكل، بس نحتاج نعرف الكمية ونمشي على الخطة."],
            ["كل مرة نفس المشكلة.", "واضح أن هذا الوقت يحتاج ننتبه له ونسأل الفريق عنه."],
            ["خربت السكر.", "القراءة ارتفعت، ونعالجها حسب الخطة."],
          ].map(([bad, good]) => (
            <div key={bad} className="rounded-2xl border border-border bg-background p-3 space-y-1.5">
              <p className="text-xs font-bold text-destructive">بدلًا من:</p>
              <p className="text-sm leading-loose text-foreground/80">«{bad}»</p>
              <p className="text-xs font-bold text-primary">قولوا:</p>
              <p className="text-sm leading-loose text-foreground">«{good}»</p>
            </div>
          ))}
        </div>
        <P>
          لا تربطوا حبكم ورضاكم بأرقام السكر. الطفل يحتاج أن يعرف أنه محبوب دائمًا، وأن الأرقام
          مجرد معلومات تساعدنا.
        </P>
      </div>
    ),
  },
  {
    id: "first-appointment-questions",
    title: "أسئلة مهمة لأول موعد بعد التشخيص",
    subtitle: "قائمة جاهزة للطباعة",
    content: (
      <div className="space-y-3">
        <P>خذوا هذه الأسئلة معكم للموعد، واكتبوا الإجابات في دفتر أو ملاحظات الجوال.</P>
        <div id="print-first-appointment" className="space-y-4">
          {[
            {
              h: "أسئلة عن السكر",
              q: [
                "ما هو نطاق السكر المناسب لطفلي في هذه المرحلة؟",
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
          ].map((sec) => (
            <div key={sec.h} className="space-y-1.5">
              <H>{sec.h}</H>
              <UL items={sec.q} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <PrintQuestionsButton targetId="print-first-appointment" />
        </div>
        <P>
          لا يلزم أن تسألوا كل شيء في موعد واحد. اختاروا أهم الأسئلة الآن، واجعلوا البقية
          للمراجعات القادمة.
        </P>
      </div>
    ),
  },
  {
    id: "misconceptions",
    title: "مفاهيم خاطئة قد تربك الأسرة",
    subtitle: "تصحيح هادئ لما يُقال في المجالس",
    content: (
      <div className="space-y-3">
        {[
          [
            "سكري النوع الأول ليس بسبب أكل الحلويات",
            "يحدث لأن الجسم لا ينتج كمية كافية من الإنسولين. ليس عقوبة، وليس بسبب تقصير الأسرة.",
          ],
          [
            "الإنسولين ليس إدمانًا",
            "الإنسولين علاج ضروري يحتاجه الجسم ليستخدم السكر كطاقة.",
          ],
          [
            "الارتفاع أو الهبوط لا يعني الفشل",
            "كل الأطفال قد تمر عليهم قراءات مرتفعة أو منخفضة. المهم معرفة التصرف الصحيح.",
          ],
          [
            "الأجهزة تساعد لكنها لا تكفي وحدها",
            "الحساس أو المضخة أدوات مساعدة، لكنها لا تغني عن فهم الخطة وملاحظة الأعراض.",
          ],
          [
            "الطفل يستطيع اللعب والذهاب للمدرسة",
            "سكري النوع الأول لا يمنع الطفل من الدراسة واللعب والرحلات، لكنه يحتاج خطة واضحة.",
          ],
          [
            "لا توجد خطة واحدة لكل الأطفال",
            "العمر والوزن والنشاط والطعام تختلف. لا تقارنوا جرعات طفلكم بطفل آخر.",
          ],
        ].map(([h, p]) => (
          <div key={h} className="rounded-2xl border border-border bg-background p-4 space-y-1.5">
            <H>{h}</H>
            <P>{p}</P>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "smart-notes",
    title: "دفتر الملاحظات الذكي",
    subtitle: "تسجيل بسيط… يفهم النمط",
    content: (
      <div className="space-y-3">
        <P>
          ليس المطلوب أن تسجل الأسرة كل شيء بطريقة مرهقة. لكن في بداية التشخيص، التسجيل البسيط
          يساعد كثيرًا على فهم النمط.
        </P>
        <H>ماذا أسجل؟</H>
        <UL
          items={[
            "وقت القراءة، وهل هي قبل الأكل أو بعده.",
            "ماذا أكل الطفل تقريبًا.",
            "هل أخذ الإنسولين؟ ومتى؟",
            "هل كان هناك نشاط أو لعب؟",
            "هل توجد أعراض؟ هل كان مريضًا أو متوترًا؟",
          ]}
        />
        <H>متى يكون التسجيل مهمًا جدًا؟</H>
        <UL
          items={[
            "عند تكرار الهبوط أو الارتفاع في نفس الوقت.",
            "وقت المرض.",
            "بعد تغيير الخطة العلاجية.",
            "قبل موعد الطبيب.",
          ]}
        />
        <H>طريقة سهلة</H>
        <div className="rounded-2xl border border-border bg-muted/40 p-4 space-y-1.5 text-sm leading-loose text-foreground/90">
          <p>«بعد الفطور بساعتين، ارتفاع تكرر ٣ أيام.»</p>
          <p>«هبوط بعد اللعب في الحديقة.»</p>
          <p>«قراءات الليل منخفضة بعد يوم رياضة.»</p>
        </div>
        <P>هذه الملاحظات القصيرة قد تكون أكثر فائدة من أرقام كثيرة بلا سياق.</P>
      </div>
    ),
  },
  {
    id: "final-family-message",
    title: "رسالة للأسرة في نهاية الدليل",
    content: (
      <div className="space-y-3">
        <P>
          أنتم لا تحتاجون أن تصبحوا خبراء في أيام قليلة. يكفي أن تتعلموا خطوة خطوة، وأن تعرفوا متى
          تتصرفون، ومتى تسألون، ومتى تطلبون المساعدة.
        </P>
        <P>
          سكري النوع الأول يغيّر روتين الأسرة، لكنه لا يلغي طفولة الطفل ولا أحلامه ولا حياته
          الطبيعية. مع الوقت، ستتحول كثير من المهام من خوف إلى عادة، ومن ارتباك إلى معرفة.
        </P>
        <P>
          لا تقيسوا نجاحكم برقم واحد. النجاح الحقيقي أن يكون الطفل آمنًا محبوبًا واثقًا، وأن
          تتعلم الأسرة كيف تتعامل مع السكري بهدوء ووعي.
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
          <Sparkles className="h-3.5 w-3.5" />
          محتوى عملي أعمق
        </span>
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft text-primary shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">دليل عملي أعمق للأهل</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-loose">
              مواضيع مختارة تساعدك في الأيام الأولى: من فهم القراءات، إلى التواصل مع الطبيب، إلى
              كلمات تبني ثقة طفلك. افتح ما يهمّك فقط.
            </p>
          </div>
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
        هذا المحتوى للتثقيف والدعم، ولا يغني عن مراجعة الطبيب أو فريق السكري. تختلف الخطط من طفل
        لآخر حسب العمر والوزن ونوع الإنسولين والقراءات والنشاط والحالة الصحية.
      </p>
    </section>
  );
}
