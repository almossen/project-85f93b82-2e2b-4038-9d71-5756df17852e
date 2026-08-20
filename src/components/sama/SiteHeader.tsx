import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { GlobalSearch } from "@/components/sama/GlobalSearch";
import samaLogo from "@/assets/sama-logo-icon.png.asset.json";

export function SiteHeader() {
  return (
    <header className="hidden md:block sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 group lg:gap-2.5">
          <img
            src={samaLogo.url}
            alt="شعار سما"
            className="h-10 w-10 shrink-0 object-contain"
            width={40}
            height={40}
          />
          <div className="leading-tight">
            <div className="text-base font-bold tracking-tight lg:text-lg">سما</div>
            <div className="hidden text-sm text-muted-foreground -mt-0.5 lg:block">
              رحلة التعايش
            </div>
          </div>
        </Link>
        <nav className="flex min-w-0 flex-nowrap items-center justify-end gap-0.5 text-[13px] font-medium whitespace-nowrap lg:gap-1 lg:text-sm">
          <Link
            to="/"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            activeOptions={{ exact: true }}
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary lg:px-3",
            }}
          >
            الرئيسية
          </Link>
          <Link
            to="/simplified-guide"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary lg:px-3",
            }}
          >
            الدليل المبسّط
          </Link>
          <Link
            to="/listen"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary lg:px-3",
            }}
          >
            استمع
          </Link>
          <Link
            to="/family-tools"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary lg:px-3",
            }}
          >
            أدوات عملية للأسرة
          </Link>
          <Link
            to="/parent-experiences"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary lg:px-3",
            }}
          >
            تجارب أهالي مفيدة
          </Link>
          <Link
            to="/about"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary lg:px-3",
            }}
          >
            عن المنصة
          </Link>
          <GlobalSearch
            trigger={
              <button
                type="button"
                aria-label="بحث في المنصة"
                className="inline-flex items-center gap-2 rounded-full border border-border px-2.5 py-2 min-h-11 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="hidden lg:inline">بحث</span>
              </button>
            }
          />
        </nav>
      </div>
    </header>
  );
}
