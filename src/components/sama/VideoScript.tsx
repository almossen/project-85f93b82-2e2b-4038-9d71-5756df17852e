import { useState } from "react";
import { Play, ChevronDown } from "lucide-react";

export function VideoScript() {
  const [open, setOpen] = useState(false);
  return (
    <section className="space-y-5">
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">شاهد الدرس في فيديو قصير</h2>
        <p className="text-muted-foreground">رسالة قصيرة مطمئنة للأهل في الأيام الأولى.</p>
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
          <span className="font-semibold text-sm">قراءة نص الفيديو</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </summary>
        <div className="mt-4 space-y-3 text-sm leading-loose text-foreground/90">
          <p>
            مرحباً، إذا تم تشخيص طفلك بسكري النوع الأول، فقد تشعر بالخوف أو الارتباك، وهذا طبيعي جداً.
          </p>
          <p>
            سكري النوع الأول يعني أن جسم الطفل لا ينتج كمية كافية من الإنسولين. والإنسولين هو الهرمون الذي يساعد السكر في الدم أن يدخل إلى خلايا الجسم ليعطيها الطاقة.
          </p>
          <p>
            المهم أن تعرف أن سكري النوع الأول ليس بسبب أكل الحلويات، وليس بسبب تقصير من الوالدين.
          </p>
          <p>
            طفلك يحتاج إلى الإنسولين، ومتابعة السكر، وتعلم بعض المهارات اليومية. قد تبدو الأمور كثيرة في البداية، لكنك ستتعلمها خطوة بخطوة.
          </p>
          <p>
            هدفنا في هذه المنصة أن نمشي معك من اليوم الأول، بلغة سهلة، وبطريقة عملية، حتى تصبح أكثر اطمئناناً وقدرة على رعاية طفلك.
          </p>
          <p className="font-medium text-foreground">
            تذكر: طفلك ليس مختلفاً في أحلامه وحياته. هو فقط يحتاج رعاية وفهماً وتنظيماً.
          </p>
        </div>
      </details>
    </section>
  );
}
