import { Link } from "@tanstack/react-router";
import { Sparkles, Search } from "lucide-react";
import { GlobalSearch } from "@/components/sama/GlobalSearch";


export function SiteHeader() {
  return (
    <header className="hidden md:block sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-4.5 w-4.5" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight">سما</div>
            <div className="text-sm text-muted-foreground -mt-0.5">رحلة التعايش</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <Link
            to="/"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "rounded-full px-3 py-2 bg-primary-soft text-primary" }}
          >
            الرئيسية
          </Link>
          <Link
            to="/simplified-guide"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-full px-3 py-2 bg-primary-soft text-primary" }}
          >
            الدليل المبسّط
          </Link>
          <Link
            to="/family-tools"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-full px-3 py-2 bg-primary-soft text-primary" }}
          >
            إضافات معرفية
          </Link>
          <Link
            to="/parent-experiences"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-full px-3 py-2 bg-primary-soft text-primary" }}
          >
            تجارب أهالي مفيدة
          </Link>
          <Link
            to="/about"
            className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            activeProps={{ className: "rounded-full px-3 py-2 bg-primary-soft text-primary" }}
          >
            عن المنصة
          </Link>
          <GlobalSearch
            trigger={
              <button
                type="button"
                aria-label="بحث في المنصة"
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 min-h-11 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Search className="h-4 w-4" />
                بحث
              </button>
            }
          />
        </nav>

      </div>
    </header>
  );
}
