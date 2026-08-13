import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Search, Wrench, AlertCircle } from "lucide-react";
import { GlobalSearch } from "@/components/sama/GlobalSearch";

const linkBase =
  "flex flex-col items-center justify-center gap-1 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";
const linkActive =
  "flex flex-col items-center justify-center gap-1 py-2.5 text-sm font-medium text-primary";

export function MobileBottomNav() {
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
            <Home className="h-5 w-5" strokeWidth={2.1} />
            <span>الرئيسية</span>
          </Link>
        </li>
        <li>
          <Link
            to="/simplified-guide"
            className={linkBase}
            activeProps={{ className: linkActive }}
          >
            <BookOpen className="h-5 w-5" strokeWidth={2.1} />
            <span>الدليل</span>
          </Link>
        </li>
        <li>
          <GlobalSearch
            trigger={
              <button type="button" className={`${linkBase} w-full`} aria-label="بحث في المنصة">
                <Search className="h-5 w-5" strokeWidth={2.1} />
                <span>بحث</span>
              </button>
            }
          />
        </li>
        <li>
          <Link
            to="/family-tools"
            className={linkBase}
            activeProps={{ className: linkActive }}
          >
            <Wrench className="h-5 w-5" strokeWidth={2.1} />
            <span>أدوات</span>
          </Link>
        </li>
        <li>
          <Link
            to="/what-to-do-now"
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-sm font-bold text-destructive transition-colors hover:text-destructive/80"
            activeProps={{ className: "flex flex-col items-center justify-center gap-1 py-2.5 text-sm font-bold text-destructive-foreground bg-destructive" }}
          >
            <AlertCircle className="h-5 w-5" strokeWidth={2.4} />
            <span>الطوارئ</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
