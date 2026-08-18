import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, BookOpen, LifeBuoy, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { guideSections } from "@/data/simplifiedGuideContent";
import { chapters } from "@/data/guideChapters";
import { emergencyScenarios } from "@/data/emergencyScenarios";

type Result = {
  key: string;
  kind: "lesson" | "case" | "page";
  title: string;
  subtitle: string;
  go: () => void;
};

const pages = [
  { title: "الدليل المبسط", subtitle: "كل الفصول والدروس", to: "/simplified-guide" },
  { title: "ماذا أفعل الآن؟", subtitle: "الحالات الطارئة", to: "/what-to-do-now" },
  { title: "إضافات معرفية", subtitle: "قوالب وقوائم للطباعة", to: "/family-tools" },
  { title: "تجارب أهالي مفيدة", subtitle: "تجارب عملية مثل جهاز متابعة السكر عن بُعد", to: "/parent-experiences" },
  { title: "عن المنصة والمصادر", subtitle: "هدف المنصة والمراجع المعتمدة", to: "/about" },
];

const kindMeta = {
  lesson: { icon: BookOpen, label: "درس" },
  case: { icon: LifeBuoy, label: "حالة طارئة" },
  page: { icon: FileText, label: "صفحة" },
} as const;

/** بحث شامل في المنصة: دروس الدليل + الحالات الطارئة + الصفحات */
export function GlobalSearch({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo<Result[]>(() => {
    const q = query.trim();
    if (!q) return [];
    const out: Result[] = [];

    guideSections.forEach((s) => {
      const match =
        s.title.includes(q) || s.body.includes(q) || (s.bullets ?? []).some((b) => b.includes(q));
      if (!match) return;
      const chIdx = chapters.findIndex((c) => c.sectionIds.includes(s.id));
      if (chIdx < 0) return;
      const lessonIdx = chapters[chIdx].sectionIds.indexOf(s.id);
      out.push({
        key: `lesson-${s.id}`,
        kind: "lesson",
        title: s.title,
        subtitle: chapters[chIdx].title,
        go: () =>
          navigate({
            to: "/simplified-guide",
            search: { ch: chIdx + 1, lesson: lessonIdx + 1 },
          }),
      });
    });

    emergencyScenarios.forEach((sc) => {
      const match =
        sc.title.includes(q) ||
        sc.shortDescription.includes(q) ||
        sc.whatItMeans.includes(q) ||
        sc.whatToDo.some((t) => t.includes(q));
      if (!match) return;
      out.push({
        key: `case-${sc.id}`,
        kind: "case",
        title: sc.title,
        subtitle: sc.shortDescription,
        go: () => navigate({ to: "/what-to-do-now", search: { case: sc.id } }),
      });
    });

    pages.forEach((p) => {
      if (!p.title.includes(q) && !p.subtitle.includes(q)) return;
      out.push({
        key: `page-${p.to}`,
        kind: "page",
        title: p.title,
        subtitle: p.subtitle,
        go: () => navigate({ to: p.to }),
      });
    });

    return out.slice(0, 30);
  }, [query, navigate]);

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setQuery("");
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 pb-3 border-b border-border text-right">
          <DialogTitle className="text-base">البحث في المنصة</DialogTitle>
          <DialogDescription className="sr-only">
            ابحث في دروس منصة سما والحالات الطارئة والصفحات.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 pb-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في الدروس والحالات والصفحات…"
              aria-label="ابحث في المنصة"
              className="w-full min-h-11 rounded-full border border-border bg-background pr-10 pl-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="max-h-[55vh] overflow-y-auto px-2 pb-3">
          {query.trim().length === 0 && (
            <p className="px-3 py-6 text-sm text-muted-foreground text-center">
              اكتب كلمة مثل «كيتونات» أو «مدرسة» أو «هبوط».
            </p>
          )}
          {query.trim().length > 0 && results.length === 0 && (
            <p className="px-3 py-6 text-sm text-muted-foreground text-center">
              لا توجد نتائج مطابقة.
            </p>
          )}
          <ul className="space-y-1">
            {results.map((r) => {
              const Meta = kindMeta[r.kind];
              const Icon = Meta.icon;
              return (
                <li key={r.key}>
                  <button
                    type="button"
                    onClick={() => {
                      r.go();
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full text-right flex items-start gap-3 rounded-xl px-3 py-3 min-h-11 hover:bg-muted transition-colors"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-sm">{r.title}</span>
                      <span className="block text-sm text-muted-foreground line-clamp-1">
                        {r.subtitle}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-sm text-muted-foreground">
                      {Meta.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
