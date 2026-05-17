import { Stethoscope } from "lucide-react";

export function AskDoctorReminder() {
  return (
    <aside className="rounded-3xl bg-gradient-to-br from-sand to-sand/60 border border-sand p-6 sm:p-8 flex items-center gap-5 flex-wrap">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-sand-foreground shrink-0 shadow-[var(--shadow-card)]">
        <Stethoscope className="h-7 w-7" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-[240px] space-y-1">
        <h3 className="font-bold text-lg text-sand-foreground">تذكير مهم</h3>
        <p className="text-sm sm:text-base text-sand-foreground/90 leading-loose">
          هذا المحتوى توعوي ولا يُغني عن طبيبكم. أي قرار يخص جرعة الإنسولين، التغذية، أو تغيير العلاج — استشيروا الفريق الطبي المعالج لابنكم.
        </p>
      </div>
    </aside>
  );
}
