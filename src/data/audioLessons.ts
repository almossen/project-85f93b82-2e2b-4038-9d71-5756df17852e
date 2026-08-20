import { chapters } from "@/data/guideChapters";
import { guideSections } from "@/data/simplifiedGuideContent";

/**
 * طبقة بيانات الصوت في سما.
 *
 * أربعة أنواع من المقاطع:
 *  - `intro`      — مقدمة واحدة تفتح الرحلة، وليست درسًا مرقّمًا.
 *  - `lesson`     — 36 درسًا مرتبة حسب فصول `guideChapters`.
 *  - `emergency`  — 7 مقاطع مرتبطة بسيناريوهات «ماذا أفعل الآن؟».
 *  - `experience` — تجربتا أهالٍ، خارج المنهج وخارج التقدم.
 *
 * قاعدة التشغيل التلقائي: المقدمة ثم الدروس الـ36 بالترتيب فقط.
 * مقاطع الطوارئ والتجارب لا تدخل في auto-next ولا في نسبة الإنجاز.
 */

export type AudioKind = "intro" | "lesson" | "emergency" | "experience";

export interface AudioTrackBase {
  id: string;
  title: string;
  src: string;
  kind: AudioKind;
}

export interface AudioIntro extends AudioTrackBase {
  kind: "intro";
}

export interface AudioLesson extends AudioTrackBase {
  kind: "lesson";
  /** ترتيب الدرس داخل المنهج، من 1 إلى 36 */
  lessonIndex: number;
  chapterId: string;
  chapterTitle: string;
}

export interface AudioEmergencyTrack extends AudioTrackBase {
  kind: "emergency";
  /** معرّف السيناريو المقابل في `emergencyScenarios` */
  scenarioId: string;
}

export interface AudioExperienceTrack extends AudioTrackBase {
  kind: "experience";
}

export type AudioTrack = AudioIntro | AudioLesson | AudioEmergencyTrack | AudioExperienceTrack;

/* ---------------------------------------------------------------- المقدمة */

export const INTRO_ID = "sama-intro";

export const audioIntro: AudioIntro = {
  id: INTRO_ID,
  title: "مقدمة: أهلًا بكم في سما",
  src: `/audio/intro/${INTRO_ID}.mp3`,
  kind: "intro",
};

/* ----------------------------------------------------------------- الدروس */

/** الدروس مرتبة حسب ترتيب الفصول ثم ترتيب الدروس داخل كل فصل. */
export const audioLessons: AudioLesson[] = (() => {
  const byId = new Map(guideSections.map((s) => [s.id, s]));
  const list: AudioLesson[] = [];
  for (const chapter of chapters) {
    for (const sectionId of chapter.sectionIds) {
      const section = byId.get(sectionId);
      if (!section) continue;
      list.push({
        id: sectionId,
        title: section.title,
        src: `/audio/lessons/${sectionId}.mp3`,
        kind: "lesson",
        lessonIndex: list.length + 1,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
      });
    }
  }
  return list;
})();

/** عدد دروس المنهج — المرجع الوحيد لأي عبارة «الدرس X من N». */
export const LESSON_COUNT = audioLessons.length;

const lessonIds = new Set(audioLessons.map((l) => l.id));

export function hasLessonAudio(sectionId: string): boolean {
  return lessonIds.has(sectionId);
}

export function lessonAudioSrc(sectionId: string): string {
  return `/audio/lessons/${sectionId}.mp3`;
}

export interface AudioChapterGroup {
  id: string;
  title: string;
  lessons: AudioLesson[];
}

export const audioChapters: AudioChapterGroup[] = chapters
  .map((c) => ({
    id: c.id,
    title: c.title,
    lessons: audioLessons.filter((l) => l.chapterId === c.id),
  }))
  .filter((c) => c.lessons.length > 0);

/**
 * قائمة التشغيل الرئيسية: المقدمة ثم الدروس الـ36.
 * المقدمة في الموضع 0 ولا تُحسب ضمن ترقيم الدروس.
 */
export const mainPlaylist: (AudioIntro | AudioLesson)[] = [audioIntro, ...audioLessons];

/** موضع المقطع داخل `mainPlaylist`، أو -1 إن لم يكن جزءًا منها. */
export function findMainIndex(trackId: string | undefined | null): number {
  if (!trackId) return -1;
  return mainPlaylist.findIndex((t) => t.id === trackId);
}

/** موضع درس داخل `mainPlaylist` (يتخطى المقدمة)، أو -1. */
export function findLessonIndex(lessonId: string | undefined | null): number {
  if (!lessonId) return -1;
  const i = mainPlaylist.findIndex((t) => t.kind === "lesson" && t.id === lessonId);
  return i;
}

/* --------------------------------------------------------------- الطوارئ */

/** كل مقطع طوارئ مربوط بسيناريو في `emergencyScenarios`. */
export const audioEmergencyTracks: AudioEmergencyTrack[] = [
  { id: "emergency-low-sugar", scenarioId: "low-sugar", title: "انخفاض السكر — ماذا أفعل الآن؟" },
  { id: "emergency-high-sugar", scenarioId: "high-sugar", title: "ارتفاع السكر — ماذا أفعل الآن؟" },
  { id: "emergency-ketones", scenarioId: "ketones", title: "وجود كيتونات — ماذا أفعل الآن؟" },
  { id: "emergency-vomiting", scenarioId: "vomiting", title: "القيء أو المرض — ماذا أفعل الآن؟" },
  {
    id: "emergency-unconscious",
    scenarioId: "unconscious",
    title: "فقدان الوعي أو التشنجات — تصرّفوا الآن",
  },
  {
    id: "emergency-missed-dose",
    scenarioId: "missed-dose",
    title: "نسيان جرعة الإنسولين — ماذا أفعل الآن؟",
  },
  {
    id: "emergency-sensor-issue",
    scenarioId: "sensor-issue",
    title: "مشكلة في الحساس — ماذا أفعل الآن؟",
  },
].map((t) => ({ ...t, src: `/audio/emergency/${t.id}.mp3`, kind: "emergency" as const }));

const emergencyByScenario = new Map(audioEmergencyTracks.map((t) => [t.scenarioId, t]));

/** مقطع الطوارئ المقابل لسيناريو معيّن، أو undefined إن لم يوجد. */
export function emergencyTrackForScenario(
  scenarioId: string | undefined | null,
): AudioEmergencyTrack | undefined {
  if (!scenarioId) return undefined;
  return emergencyByScenario.get(scenarioId);
}

/* --------------------------------------------------------------- التجارب */

export const audioExperienceTracks: AudioExperienceTrack[] = [
  {
    id: "experience-sugarpixel",
    title: "تجربة أهل: متابعة السكر عن بُعد باستخدام SugarPixel",
  },
  { id: "experience-frio", title: "تجربة أهل: حافظة FRIO للإنسولين" },
].map((t) => ({ ...t, src: `/audio/experiences/${t.id}.mp3`, kind: "experience" as const }));

const experienceById = new Map(audioExperienceTracks.map((t) => [t.id, t]));

export function experienceTrack(id: string): AudioExperienceTrack | undefined {
  return experienceById.get(id);
}
