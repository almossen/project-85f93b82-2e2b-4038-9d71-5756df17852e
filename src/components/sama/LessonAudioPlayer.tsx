import { Link } from "@tanstack/react-router";
import { Headphones } from "lucide-react";
import { hasLessonAudio } from "@/data/audioLessons";

type Props = {
  sectionId: string;
  lessonLabel: string;
};

/**
 * CTA خفيف يفتح صفحة الاستماع على نفس الدرس (بدون تشغيل تلقائي).
 * لا يظهر إذا لم يكن للدرس ملف صوتي.
 */
export function LessonAudioPlayer({ sectionId }: Props) {
  if (!hasLessonAudio(sectionId)) return null;

  return (
    <Link
      to="/listen"
      search={{ lesson: sectionId }}
      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary-soft/60 px-4 py-2.5 min-h-11 text-sm font-semibold text-primary hover:bg-primary-soft transition-colors print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Headphones className="h-4 w-4" />
      استمع إلى النسخة الصوتية
    </Link>
  );
}
