import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sama-guide-progress-v1";

type Stored = {
  readSections: string[];
  lastChapter: number;
};

function load(): Stored {
  if (typeof window === "undefined") return { readSections: [], lastChapter: 0 };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { readSections: [], lastChapter: 0 };
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return {
      readSections: Array.isArray(parsed.readSections) ? parsed.readSections : [],
      lastChapter: typeof parsed.lastChapter === "number" ? parsed.lastChapter : 0,
    };
  } catch {
    return { readSections: [], lastChapter: 0 };
  }
}

function save(data: Stored) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage full or blocked */
  }
}

/**
 * يحفظ تقدم القراءة في الدليل المبسّط على جهاز المستخدم:
 * الدروس المكتملة + آخر فصل وصل له، حتى يكمل من حيث توقف.
 */
export function useGuideProgress(totalSections: number) {
  const [readSections, setReadSections] = useState<Set<string>>(new Set());
  const [lastChapter, setLastChapterState] = useState(0);
  const [restored, setRestored] = useState(false);

  // الاستعادة تتم بعد التحميل فقط (توافقًا مع SSR)
  useEffect(() => {
    const data = load();
    setReadSections(new Set(data.readSections));
    setLastChapterState(data.lastChapter);
    setRestored(true);
  }, []);

  const toggleRead = useCallback(
    (sectionId: string) => {
      setReadSections((prev) => {
        const next = new Set(prev);
        if (next.has(sectionId)) next.delete(sectionId);
        else next.add(sectionId);
        save({ readSections: [...next], lastChapter });
        return next;
      });
    },
    [lastChapter],
  );

  const setLastChapter = useCallback(
    (idx: number) => {
      setLastChapterState(idx);
      save({ readSections: [...readSections], lastChapter: idx });
    },
    [readSections],
  );

  const readCount = readSections.size;
  const percent = totalSections > 0 ? Math.round((readCount / totalSections) * 100) : 0;

  return { readSections, toggleRead, lastChapter, setLastChapter, readCount, percent, restored };
}
