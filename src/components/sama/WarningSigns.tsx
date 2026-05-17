import { TrendingDown, TrendingUp, PhoneCall, AlertTriangle } from "lucide-react";

const low = {
  title: "هبوط السكر (أقل من ٧٠)",
  subtitle: "Hypoglycemia — يحدث بسرعة، ويحتاج تدخل فوري",
  signs: [
    "رجفة في اليدين أو الجسم",
    "تعرّق بارد وشحوب",
    "دوخة، صداع، أو ضعف",
    "جوع مفاجئ وعصبية غير معتادة",
    "تشتّت، صعوبة في الكلام أو التركيز",
  ],
  action: "أعطوا فوراً ١٥ غ سكر سريع: نصف كوب عصير، أو ٣ حبات سكر، ثم أعيدوا القياس بعد ١٥ دقيقة.",
};

const high = {
  title: "ارتفاع السكر (أعلى من ٢٥٠)",
  subtitle: "Hyperglycemia — يحدث تدريجياً، لكنه خطر إن أُهمل",
  signs: [
    "عطش شديد وكثرة شرب الماء",
    "كثرة التبول، أحياناً تبليل اللاحياء",
    "تعب وخمول غير معتاد",
    "ألم بطن أو غثيان",
    "تنفّس سريع برائحة شبيهة بالفواكه",
  ],
  action: "اقرؤوا الكيتونات إن توفّر، وأعطوا الإنسولين التصحيحي حسب خطة الطبيب، واتصلوا بالعيادة إن استمر الارتفاع.",
};

export function WarningSigns() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">علامات يجب أن تعرفوها</h2>
        <p className="text-muted-foreground">
          ميّزوا الفرق بين هبوط السكر وارتفاعه — معرفتكم بهذه العلامات قد تنقذ ابنكم.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {[
          { data: low, tint: "destructive", Icon: TrendingDown, badge: "عاجل" },
          { data: high, tint: "warning", Icon: TrendingUp, badge: "تحت المراقبة" },
        ].map(({ data, tint, Icon, badge }) => (
          <article
            key={data.title}
            className={`rounded-3xl border p-6 space-y-4 ${
              tint === "destructive"
                ? "bg-destructive/5 border-destructive/30"
                : "bg-warning/10 border-warning/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                tint === "destructive" ? "bg-destructive/15 text-destructive" : "bg-warning/30 text-warning-foreground"
              }`}>
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <span className={`text-[10px] font-bold rounded-full px-2.5 py-1 ${
                tint === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"
              }`}>
                {badge}
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">{data.title}</h3>
              <p className="text-xs text-muted-foreground">{data.subtitle}</p>
            </div>
            <ul className="space-y-2 text-sm leading-loose">
              {data.signs.map((s) => (
                <li key={s} className="flex gap-2.5">
                  <span className={`${tint === "destructive" ? "text-destructive" : "text-warning-foreground"} font-bold`}>•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-card border border-border p-3.5 text-sm leading-loose">
              <strong className="text-foreground">ماذا نفعل؟ </strong>
              <span className="text-muted-foreground">{data.action}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-2xl bg-destructive/10 border border-destructive/30 p-5 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <p className="font-semibold text-sm">متى نتصل بالطوارئ فوراً؟</p>
          <p className="text-sm text-muted-foreground leading-loose">
            فقدان وعي، تشنّجات، قيء متواصل مع ارتفاع السكر، أو صعوبة تنفّس — اتصلوا بـ <strong className="text-destructive">٩٩٧</strong> أو اذهبوا لأقرب طوارئ مباشرة.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-destructive font-medium pt-1">
            <PhoneCall className="h-3.5 w-3.5" /> الهلال الأحمر السعودي: ٩٩٧
          </p>
        </div>
      </div>
    </section>
  );
}
