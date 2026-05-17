import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "هل سيشفى ابني من سكري النوع الأول يوماً ما؟",
    a: "حالياً لا يوجد علاج نهائي معتمد عالمياً، لكن الأبحاث متقدّمة جداً (زراعة خلايا، علاجات مناعية). في المقابل، حياة طفل السكري اليوم أقرب للحياة الطبيعية أكثر من أي وقت مضى — بفضل المضخات وأجهزة القياس المستمر.",
  },
  {
    q: "هل يمكن أن يصاب أخوه أو أخته أيضاً؟",
    a: "احتمال إصابة الأخوة موجود لكنه منخفض (٤–٦٪ تقريباً). ليس مرضاً معدياً، وليس وراثياً بشكل مباشر مثل الأمراض الجينية الأخرى. استشيروا طبيبكم إن لاحظتم أعراضاً كالعطش الشديد وكثرة التبول.",
  },
  {
    q: "هل يستطيع ابني الصيام في رمضان؟",
    a: "الأطفال غير مكلَّفين شرعاً بالصيام. أما المراهق، فالصيام ممكن في حالات معيّنة وبعد تقييم الفريق الطبي، ووضع خطة دقيقة للإنسولين والقياس. لا تتخذوا القرار وحدكم — استشيروا طبيب الغدد.",
  },
  {
    q: "هل أُخبر المدرسة؟ وكيف؟",
    a: "نعم، إخبار المدرسة ضروري لسلامة ابنكم. اجتمعوا بالمديرة والممرضة والمعلمات، وزوّدوهم بخطة مكتوبة: مواعيد القياس، علامات الهبوط، أرقام الطوارئ. كثير من المدارس لديها بروتوكول جاهز.",
  },
  {
    q: "هل يحتاج لنظام غذائي مختلف عن بقية الأسرة؟",
    a: "لا، طعامه هو طعامكم. الفرق الوحيد هو حساب الكربوهيدرات وأخذ الإنسولين قبل الوجبة. أخصائي التغذية سيعلّمكم الحساب — تدريجياً ستصبح عادة سهلة.",
  },
  {
    q: "كم مرة سيقيس السكر يومياً؟",
    a: "تقليدياً ٤–٦ مرات (قبل الوجبات وقبل النوم). مع جهاز القياس المستمر (CGM) يصبح الأمر تلقائياً بدون وخز كثير. يحدد الفريق الطبي البروتوكول المناسب لكم.",
  },
  {
    q: "ماذا أفعل إذا رفض ابني الحقن أو القياس؟",
    a: "هذا طبيعي ومتوقّع — خاصة في الأسابيع الأولى. استخدموا أسلوب الحوار، شاركوه في اختيار مكان الحقن، كافئوه، ولا تحوّلوا الحقن إلى عقاب. إذا استمر الرفض، اطلبوا دعم أخصائي نفسي للأطفال.",
  },
  {
    q: "ما الفرق بين النوع الأول والنوع الثاني؟",
    a: "النوع الأول: مناعي، يصيب الأطفال غالباً، البنكرياس يتوقّف عن إنتاج الإنسولين، يحتاج إنسولين مدى الحياة. النوع الثاني: مرتبط بالسمنة ونمط الحياة، شائع عند البالغين، الجسم يقاوم الإنسولين، يُعالَج غالباً بالحبوب والحمية.",
  },
];

function FaqItem({ item, idx }: { item: typeof faqs[number]; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-right flex items-start justify-between gap-4 p-5 hover:bg-muted/40 transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3 flex-1">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary text-xs font-bold mt-0.5">
            {idx + 1}
          </span>
          <span className="font-semibold leading-loose text-sm sm:text-base">{item.q}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform mt-1 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 pr-[60px]">
          <p className="text-sm text-muted-foreground leading-loose">{item.a}</p>
        </div>
      )}
    </div>
  );
}

export function Faq() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/40 text-mint-foreground mb-1">
          <HelpCircle className="h-5 w-5" strokeWidth={2} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">أسئلة يسألها كل أهل جديد</h2>
        <p className="text-muted-foreground">
          ٨ أسئلة جمعناها من تجارب عائلات سعودية — أجوبتها بناءً على أحدث الإرشادات الطبية.
        </p>
      </header>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <FaqItem key={i} item={f} idx={i} />
        ))}
      </div>
    </section>
  );
}
