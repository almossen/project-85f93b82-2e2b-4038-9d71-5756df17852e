import { Link } from "@tanstack/react-router";
import { Home, BookOpen, Layers } from "lucide-react";

const items = [
  { to: "/", label: "الرئيسية", icon: Home, exact: true },
  { to: "/lesson/$id", params: { id: "1" }, label: "الدرس الأول", icon: BookOpen },
  { to: "/module/first-days", label: "الدرس الثاني", icon: Layers },
] as const;

export function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      aria-label="التنقل السفلي"
    >
      <ul className="grid grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const linkProps: any = { to: item.to };
          if ("params" in item) linkProps.params = item.params;
          if ("exact" in item) linkProps.activeOptions = { exact: true };
          return (
            <li key={item.label}>
              <Link
                {...linkProps}
                className="flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-primary" }}
              >
                <Icon className="h-5 w-5" strokeWidth={2.1} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
