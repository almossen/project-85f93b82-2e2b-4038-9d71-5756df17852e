import { chapters } from "@/data/guideChapters";
import { guideSections } from "@/data/simplifiedGuideContent";

/**
 * الدروس التي لها ملف صوتي فعلي داخل public/audio/lessons/
 * هذه هي القائمة المرجعية الوحيدة — لا تُكرّر في أي ملف آخر.
 */
export const AUDIO_LESSON_IDS: readonly string[] = [
  "journey-start",
  "what-is-t1d",
  "first-week",
  "parents-feelings",
  "what-is-insulin",
  "rapid-insulin",
  "long-insulin",
  "injection-basics",
  "why-measure",
  "fingerstick",
  "cgm-sensor",
  "sensor-arrows",
  "low-sugar",
  "severe-low",
  "glucagon",
  "high-sugar",
  "ketones",
  "illness",
  "sick-day-plan",
  "food-allowed",
  "carbs",
  "school",
  "diabetes-bag",
  "play-sport",
  "emergency",
  "confidence",
  "family-role",
  "final-message",
];

const audioSet = new Set(AUDIO_LESSON_IDS);

export function hasLessonAudio(sectionId: string): boolean {
  return audioSet.has(sectionId);
}

export function lessonAudioSrc(sectionId: string): string {
  return `/audio/lessons/${sectionId}.mp3`;
}

export interface AudioLesson {
  id: string;
  title: string;
  src: string;
  /** الرقم العالمي للدرس داخل القائمة الصوتية (يبدأ من 1) */
  index: number;
  chapterId: string;
  chapterTitle: string;
}

/** قائمة التشغيل مرتبة حسب ترتيب الفصول ثم ترتيب الدروس داخل كل فصل */
export const audioPlaylist: AudioLesson[] = (() => {
  const byId = new Map(guideSections.map((s) => [s.id, s]));
  const list: AudioLesson[] = [];
  for (const chapter of chapters) {
    for (const sectionId of chapter.sectionIds) {
      const section = byId.get(sectionId);
      if (!section || !audioSet.has(sectionId)) continue;
      list.push({
        id: sectionId,
        title: section.title,
        src: lessonAudioSrc(sectionId),
        index: list.length + 1,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
      });
    }
  }
  return list;
})();

export interface AudioChapterGroup {
  id: string;
  title: string;
  lessons: AudioLesson[];
}

export const audioChapters: AudioChapterGroup[] = chapters
  .map((c) => ({
    id: c.id,
    title: c.title,
    lessons: audioPlaylist.filter((l) => l.chapterId === c.id),
  }))
  .filter((c) => c.lessons.length > 0);

export function findLessonIndex(lessonId: string | undefined | null): number {
  if (!lessonId) return -1;
  return audioPlaylist.findIndex((l) => l.id === lessonId);
}
