import { Quote, Heart } from "lucide-react";
import familyKitchen from "@/assets/family-kitchen.jpg";

export function FamilyStory() {
  return (
    <section className="space-y-6">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft text-primary px-3 py-1 text-xs font-medium">
          <Heart className="h-3.5 w-3.5 fill-current" />
          من تجارب الأهل
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">قصة أسرة أبو فهد</h2>
        <p className="text-muted-foreground">شهادة حقيقية من أم سعودية بعد عامين من تشخيص ابنها.</p>
      </header>

      <article className="rounded-3xl bg-card border border-border overflow-hidden grid md:grid-cols-[1fr_1.3fr] shadow-[var(--shadow-card)]">
        <div className="relative h-64 md:h-auto">
          <img
            src={familyKitchen}
            alt="عائلة سعودية في المطبخ تحضّر وجبة معاً"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-8 space-y-5 text-right relative">
          <Quote className="absolute top-6 left-6 h-10 w-10 text-primary/15" />
          <p className="text-base sm:text-lg leading-[2.1] text-foreground/90">
            «يوم سمعت التشخيص لأول مرة، انهار العالم تحت قدمي. كنت أبكي بالليل وأنا أنظر لفهد وهو نايم، أسأل نفسي: كيف بيكبر؟ كيف بيعيش حياة طبيعية؟ كيف بنحقنه كل يوم؟»
          </p>
          <p className="text-sm sm:text-base leading-[2.1] text-muted-foreground">
            «اليوم، فهد عمره ٩ سنوات، يلعب كرة قدم في النادي، أوّل على فصله، ويعطي إنسولينه بنفسه. السكري صار جزء بسيط من يومنا، مو حياتنا كلها. لو كنت أعرف من البداية إن الطريق سهل بالعلم والصبر، كان تعبت أقل.»
          </p>
          <footer className="pt-3 border-t border-border flex items-center justify-between gap-3 flex-wrap">
            <div className="text-sm">
              <p className="font-semibold">أم فهد</p>
              <p className="text-xs text-muted-foreground">الرياض — تشخيص ٢٠٢٣</p>
            </div>
            <span className="text-[10px] font-medium rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
              شهادة مُعاد صياغتها بإذن الأسرة
            </span>
          </footer>
        </div>
      </article>
    </section>
  );
}
