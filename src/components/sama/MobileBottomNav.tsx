import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  BookOpen,
  Search,
  AlertCircle,
  MoreHorizontal,
  HeartHandshake,
  Wrench,
  Info,
  Library,
  ShieldCheck,
} from "lucide-react";
import { GlobalSearch } from "@/components/sama/GlobalSearch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const linkBase =
  "flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const linkActive =
  "flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium text-primary";

const moreLinks = [
  { to: "/parent-experiences", label: "تجارب أهالي مفيدة", icon: HeartHandshake },
  { to: "/family-tools", label: "إضافات معرفية", icon: Wrench },
  { to: "/about", label: "عن المنصة", icon: Info },
  { to: "/sources", label: "المصادر", icon: Library },
  { to: "/privacy", label: "سياسة الخصوصية", icon: ShieldCheck },
] as const;

export function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="التنقل السفلي"
    >
      <ul className="grid grid-cols-5">
        <li>
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={linkBase}
            activeProps={{ className: linkActive }}
          >
            <Home className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
            <span>الرئيسية</span>
          </Link>
        </li>
        <li>
          <Link to="/simplified-guide" className={linkBase} activeProps={{ className: linkActive }}>
            <BookOpen className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
            <span>الدليل</span>
          </Link>
        </li>
        <li>
          <Link
            to="/what-to-do-now"
            aria-label="طوارئ — ماذا أفعل الآن؟"
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-bold text-destructive transition-colors hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            activeProps={{
              className:
                "flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-bold text-destructive-foreground bg-destructive",
            }}
          >
            <AlertCircle className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
            <span>طوارئ</span>
          </Link>
        </li>
        <li>
          <GlobalSearch
            trigger={
              <button type="button" className={`${linkBase} w-full`} aria-label="بحث في المنصة">
                <Search className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
                <span>بحث</span>
              </button>
            }
          />
        </li>
        <li>
          <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
            <SheetTrigger asChild>
              <button type="button" className={`${linkBase} w-full`} aria-label="المزيد من الأقسام">
                <MoreHorizontal className="h-5 w-5" strokeWidth={2.1} aria-hidden="true" />
                <span>المزيد</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl pb-[calc(env(safe-area-inset-bottom)+1rem)]">
              <SheetHeader className="text-right">
                <SheetTitle>المزيد من الأقسام</SheetTitle>
              </SheetHeader>
              <ul className="mt-4 space-y-1">
                {moreLinks.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-3 min-h-11 text-sm font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      activeProps={{
                        className:
                          "flex items-center gap-3 rounded-xl px-3 py-3 min-h-11 text-sm font-semibold text-primary bg-primary-soft",
                      }}
                    >
                      <l.icon className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}
