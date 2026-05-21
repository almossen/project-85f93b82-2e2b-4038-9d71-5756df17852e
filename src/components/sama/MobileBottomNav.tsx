import { Link } from "@tanstack/react-router";
import { Home, BookOpen, AlertCircle } from "lucide-react";

const linkBase =
  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground";
const linkActive =
  "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-primary";

export function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="التنقل السفلي"
    >
      <ul className="grid grid-cols-3">
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
            <span>الدليل المبسّط</span>
          </Link>
        </li>
        <li>
          <Link
            to="/what-to-do-now"
            className={linkBase}
            activeProps={{ className: linkActive }}
          >
            <AlertCircle className="h-5 w-5" strokeWidth={2.1} />
            <span>ماذا أفعل الآن</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
