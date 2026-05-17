import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

const points = [
  "سكري النوع الأول يعني أن الجسم لا ينتج الإنسولين الكافي.",
  "الطفل يحتاج إلى الإنسولين حسب خطة الطبيب.",
  "المرض ليس بسبب الحلويات أو تقصير الأهل.",
  "الخوف في البداية طبيعي.",
  "التعلم يكون خطوة بخطوة.",
  "الإيمان والصبر لا يمنعان الأخذ بالأسباب.",
];

export function LessonSummary() {
  return (
    <section className="grid md:grid-cols-[1.4fr_1fr] gap-5">
      <div className="rounded-3xl bg-primary-soft/60 border border-primary/20 p-6 sm:p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">ملخص الدرس</h2>
        <ul className="space-y-3">
          {points.map((p, i) => (
            <li key={i} className="flex gap-3 items-start">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base leading-loose">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-card border border-border p-6 sm:p-8 space-y-3 flex flex-col justify-between shadow-[var(--shadow-card)]">
        <div className="space-y-2">
          <span className="inline-block text-xs font-medium text-muted-foreground">الدرس القادم</span>
          <h3 className="text-lg font-bold">الأيام الأولى بعد التشخيص</h3>
          <p className="text-sm text-muted-foreground leading-loose">
            ماذا يجب أن يعرف ولي الأمر؟ الإنسولين، القياس، الحقن، الحفظ، وحقيبة السكري — في درس عملي مبسّط.
          </p>
        </div>
        <Link
          to="/module/first-days"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          انتقل للدرس الثاني
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

