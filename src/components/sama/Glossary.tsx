import { BookA } from "lucide-react";

const terms = [
  {
    ar: "البنكرياس",
    en: "Pancreas",
    def: "غدة خلف المعدة، تُفرز الإنسولين. في النوع الأول، تتوقّف خلاياها المنتجة للإنسولين عن العمل.",
  },
  {
    ar: "الإنسولين",
    en: "Insulin",
    def: "هرمون يعمل كمفتاح يفتح خلايا الجسم ليدخلها السكر فيتحوّل إلى طاقة.",
  },
  {
    ar: "السكر التراكمي",
    en: "HbA1c",
    def: "فحص دم يقيس متوسط مستوى السكر خلال آخر ٣ أشهر. الهدف غالباً أقل من ٧٪ (يحدده الطبيب).",
  },
  {
    ar: "الكيتونات",
    en: "Ketones",
    def: "مواد ينتجها الجسم حين لا يجد إنسولين كافياً ويبدأ بحرق الدهون. ارتفاعها مع السكر = خطر.",
  },
  {
    ar: "الجلوكاجون",
    en: "Glucagon",
    def: "حقنة طوارئ تُعطى عند هبوط السكر الشديد مع فقدان الوعي — ترفع السكر بسرعة.",
  },
  {
    ar: "الكربوهيدرات",
    en: "Carbs",
    def: "المغذي الذي يتحوّل إلى سكر في الدم: الخبز، الأرز، الفواكه، الحليب، الحلويات.",
  },
  {
    ar: "مضخة الإنسولين",
    en: "Insulin Pump",
    def: "جهاز صغير يُعطي الإنسولين بشكل مستمر عبر أنبوب رفيع تحت الجلد، بديل عن الحقن المتعدد.",
  },
  {
    ar: "جهاز القياس المستمر",
    en: "CGM",
    def: "حساس يُلصق على الجلد، يقرأ السكر كل بضع دقائق ويرسل النتائج للهاتف — يقلل وخز الأصابع.",
  },
];

export function Glossary() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary mb-1">
          <BookA className="h-5 w-5" strokeWidth={2} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">قاموس المصطلحات</h2>
        <p className="text-muted-foreground">
          ٨ كلمات ستسمعونها كثيراً من الفريق الطبي — هذه ترجمتها بلغة بسيطة.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-3">
        {terms.map((t) => (
          <article
            key={t.en}
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h3 className="font-bold text-base">{t.ar}</h3>
              <span className="text-[11px] font-mono text-muted-foreground tracking-wide" dir="ltr">
                {t.en}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-loose">{t.def}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
