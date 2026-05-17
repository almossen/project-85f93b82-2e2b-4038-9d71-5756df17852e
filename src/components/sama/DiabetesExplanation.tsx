import { Apple, Droplet, Key, Zap, XCircle } from "lucide-react";

function FlowStep({
  icon: Icon,
  label,
  tint,
}: {
  icon: React.ElementType;
  label: string;
  tint: "blue" | "mint" | "sand" | "rose";
}) {
  const tints = {
    blue: "bg-primary-soft text-primary",
    mint: "bg-mint/40 text-mint-foreground",
    sand: "bg-sand text-sand-foreground",
    rose: "bg-destructive/10 text-destructive",
  };
  return (
    <div className="flex flex-col items-center text-center gap-2 min-w-[80px]">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tints[tint]}`}>
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </div>
  );
}

function Arrow() {
  return <div className="text-muted-foreground text-xl select-none">←</div>;
}

export function DiabetesExplanation() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">ما الذي يحدث داخل جسم ابنك؟</h2>
        <p className="text-muted-foreground">
          شرح بسيط بمخطط مرئي — كيف يعمل الجسم الطبيعي، وما الذي يختلف مع سكري النوع الأول.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Normal */}
        <div className="rounded-2xl border border-mint/50 bg-mint/10 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">عند الطفل السليم</h3>
            <span className="text-xs font-medium rounded-full bg-mint/60 text-mint-foreground px-2.5 py-1">
              طبيعي
            </span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 py-2">
            <FlowStep icon={Apple} label="الطعام" tint="mint" />
            <Arrow />
            <FlowStep icon={Droplet} label="سكر في الدم" tint="blue" />
            <Arrow />
            <FlowStep icon={Key} label="إنسولين" tint="mint" />
            <Arrow />
            <FlowStep icon={Zap} label="طاقة" tint="sand" />
          </div>
          <p className="text-sm text-muted-foreground leading-loose">
            البنكرياس يُفرز <strong className="text-foreground">الإنسولين</strong> الذي يعمل كمفتاح يفتح خلايا الجسم ليدخلها السكر ويتحوّل إلى طاقة.
          </p>
        </div>

        {/* T1D */}
        <div className="rounded-2xl border border-primary/30 bg-primary-soft/50 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">عند طفل النوع الأول</h3>
            <span className="text-xs font-medium rounded-full bg-primary text-primary-foreground px-2.5 py-1">
              يحتاج إنسولين
            </span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-2 py-2">
            <FlowStep icon={Apple} label="الطعام" tint="mint" />
            <Arrow />
            <FlowStep icon={Droplet} label="سكر مرتفع" tint="rose" />
            <Arrow />
            <FlowStep icon={XCircle} label="لا يوجد إنسولين" tint="rose" />
            <Arrow />
            <FlowStep icon={Zap} label="نقص طاقة" tint="sand" />
          </div>
          <p className="text-sm text-muted-foreground leading-loose">
            البنكرياس توقّف عن إفراز الإنسولين، لذلك نعطيه من الخارج عبر الحقن أو المضخة — وعندها يعود كل شيء لطبيعته.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border p-5 text-center">
        <p className="text-sm sm:text-base">
          <strong className="text-primary">الخلاصة:</strong> سكري النوع الأول ليس بسبب الحلوى ولا بسبب شيء فعلتموه. هو حالة مناعية يقرر فيها الجسم — لأسباب لا تزال قيد البحث — إيقاف خلايا الإنسولين في البنكرياس.
        </p>
      </div>
    </section>
  );
}
