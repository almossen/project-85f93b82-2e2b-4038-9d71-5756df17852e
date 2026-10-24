import { Link } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { GlobalSearch } from "@/components/sama/GlobalSearch";
import samaLogo from "@/assets/sama-logo-white.png";

type SiteHeaderProps = {
  logoOverride?: string;
  showMobileBrand?: boolean;
};

export function SiteHeader({ logoOverride, showMobileBrand = false }: SiteHeaderProps) {
  const logoSrc = logoOverride ?? samaLogo;

  return (
    <>
      <header className={`${showMobileBrand ? "" : "hidden md:block"} border-b border-border/60 bg-background lg:hidden`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link
            to="/"
            aria-label="سما — الصفحة الرئيسية"
            className="flex min-w-0 items-center gap-3"
          >
            <img
              src={logoSrc}
              alt="شعار سما"
              className="h-12 w-12 shrink-0 rounded-xl object-contain"
              width={48}
              height={48}
            />
            <div className="min-w-0 leading-tight">
              <div className="text-base font-bold">سما</div>
              <div className="text-xs text-muted-foreground">رحلة التعايش</div>
            </div>
          </Link>
          <GlobalSearch
            trigger={
              <button type="button" aria-label="بحث في المنصة" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Search className="h-5 w-5" />
              </button>
            }
          />
        </div>
        </header>
      <header className="hidden lg:block sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 min-h-20 py-2">
          <Link to="/" className="flex shrink-0 items-center gap-2 group lg:gap-2.5">
            <img
              src={logoSrc}
              alt="شعار سما"
              className="h-14 w-14 shrink-0 rounded-xl object-contain"
              width={56}
              height={56}
            />
            <div className="leading-tight">
              <div className="text-base font-bold tracking-tight lg:text-lg">سما</div>
              <div className="hidden text-sm text-muted-foreground -mt-0.5 lg:block">
                رحلة التعايش
              </div>
            </div>
          </Link>
          <nav className="flex min-w-0 flex-nowrap whitespace-nowrap items-center justify-end gap-x-1 text-sm xl:text-[15px] font-medium [&>a]:inline-flex [&>a]:items-center [&>a]:min-h-11">
          <Link
            to="/"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3"
            activeOptions={{ exact: true }}
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary xl:px-3",
            }}
          >
            الرئيسية
          </Link>
          <Link
            to="/simplified-guide"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary xl:px-3",
            }}
          >
            الدليل المبسّط
          </Link>
          <Link
            to="/listen"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary xl:px-3",
            }}
          >
            استمع
          </Link>
          <Link
            to="/family-tools"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary xl:px-3",
            }}
          >
            أدوات عملية للأسرة
          </Link>
          <Link
            to="/parent-experiences"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary xl:px-3",
            }}
          >
            تجارب أهالي مفيدة
          </Link>
          <a
            href="/teens/"
            className="inline-flex items-center rounded-full border border-teens-border bg-teens-soft px-2.5 py-1.5 font-semibold text-teens-foreground transition-colors hover:bg-teens-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teens-ring xl:px-3"
          >
            عالم الشباب السكريين
          </a>
          <a
            href="/kids/"
            className="inline-flex items-center gap-1.5 rounded-full border border-kids/40 bg-kids-soft px-2 py-1 font-semibold text-kids-foreground transition-colors hover:border-kids hover:bg-kids hover:text-kids-contrast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kids lg:px-2.5 lg:py-1.5 xl:px-3"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            عالم سما للأطفال
          </a>
          <Link
            to="/about"
            className="rounded-full px-2 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground xl:px-3"
            activeProps={{
              className: "rounded-full px-2 py-2 bg-primary-soft text-primary xl:px-3",
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
                <span className="hidden xl:inline">بحث</span>
              </button>
            }
          />
          </nav>
        </div>
      </header>
    </>
  );
}
