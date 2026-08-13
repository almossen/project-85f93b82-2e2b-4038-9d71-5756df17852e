export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  sectionIds: string[];
};

export const chapters: Chapter[] = [
  {
    id: "ch-1",
    title: "الفصل الأول: البداية",
    subtitle: "الأيام الأولى بعد التشخيص",
    sectionIds: ["journey-start", "what-is-t1d", "first-week", "parents-feelings"],
  },
  {
    id: "ch-2",
    title: "الفصل الثاني: الإنسولين",
    subtitle: "ما هو ولماذا وكيف",
    sectionIds: ["what-is-insulin", "rapid-insulin", "long-insulin", "injection-basics"],
  },
  {
    id: "ch-3",
    title: "الفصل الثالث: قياس السكر",
    subtitle: "الجهاز، الحساس، والأسهم",
    sectionIds: ["why-measure", "fingerstick", "cgm-sensor", "sensor-arrows"],
  },
  {
    id: "ch-4",
    title: "الفصل الرابع: الانخفاض والارتفاع",
    subtitle: "الهبوط، الجلوكاجون، الارتفاع، والكيتونات",
    sectionIds: ["low-sugar", "severe-low", "glucagon", "high-sugar", "ketones"],
  },
  {
    id: "ch-5",
    title: "الفصل الخامس: الحياة اليومية",
    subtitle: "المرض، الأكل، المدرسة، واللعب",
    sectionIds: [
      "illness",
      "sick-day-plan",
      "food-allowed",
      "carbs",
      "school",
      "diabetes-bag",
      "play-sport",
    ],
  },
  {
    id: "ch-6",
    title: "الفصل السادس: الطوارئ والدعم",
    subtitle: "متى أطلب المساعدة، الثقة، ودور الأسرة",
    sectionIds: ["emergency", "confidence", "family-role", "final-message"],
  },
];
