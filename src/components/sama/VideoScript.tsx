import { useState } from "react";
import { Play, ChevronDown } from "lucide-react";

export function VideoScript() {
  const [open, setOpen] = useState(false);
  return (
    <section className="space-y-5">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">شاهد الدرس في فيديو قصير</h2>
        <p className="text-muted-foreground">مدة الفيديو ٣ دقائق — يلخّص الدرس بصرياً للأهل.</p>
      </header>

      <div className="relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-primary-soft to-mint/30 border border-border shadow-[var(--shadow-card)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:scale-105 transition-transform"
            aria-label="تشغيل الفيديو"
          >
            <Play className="h-8 w-8 fill-current mr-1" />
          </button>
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-medium rounded-full bg-background/80 backdrop-blur px-3 py-1.5">
          نموذج توضيحي — سيتم تصوير الفيديو لاحقاً
        </div>
      </div>

      <details
        open={open}
        onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
        className="rounded-2xl border border-border bg-card p-5 group"
      >
        <summary className="flex items-center justify-between cursor-pointer list-none">
          <span className="font-semibold text-sm">قراءة سيناريو الفيديو</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </summary>
        <div className="mt-4 space-y-3 text-sm leading-loose text-muted-foreground">
          <p>
            <strong className="text-foreground">المشهد ١ (٠:٠٠–٠:٣٠):</strong> صورة عائلة سعودية تجلس مع طفلهم في غرفة المعيشة. صوت الراوي: «حين سمعتم الخبر للمرة الأولى، توقّف الوقت قليلاً… هذا طبيعي.»
          </p>
          <p>
            <strong className="text-foreground">المشهد ٢ (٠:٣٠–١:٣٠):</strong> رسوم متحركة لجسم طفل، تظهر البنكرياس والإنسولين كمفتاح يفتح الخلايا. شرح بسيط لما يحدث.
          </p>
          <p>
            <strong className="text-foreground">المشهد ٣ (١:٣٠–٢:٣٠):</strong> لقطات لأطفال يلعبون، يدرسون، يمارسون الرياضة. صوت الراوي: «ابنكم سيكبر، سيحقق أحلامه — السكري جزء من حياته، لا حياته كلها.»
          </p>
          <p>
            <strong className="text-foreground">المشهد ٤ (٢:٣٠–٣:٠٠):</strong> آية قرآنية تظهر برفق، ثم شعار سما ودعوة لاستكمال الرحلة.
          </p>
        </div>
      </details>
    </section>
  );
}
