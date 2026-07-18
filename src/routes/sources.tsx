import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { Sources } from "@/components/sama/Sources";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "المصادر والمراجع — سما" },
      {
        name: "description",
        content:
          "المصادر الطبية والتثقيفية التي استند إليها محتوى منصة سما، بعد مراجعته من مختص.",
      },
      { property: "og:title", content: "المصادر والمراجع — سما" },
      {
        property: "og:description",
        content: "مصادر موثوقة في سكري النوع الأول للأطفال: وزارة الصحة السعودية، ISPAD، CDC، ADA، Mayo Clinic، والهلال الأحمر السعودي.",
      },
    ],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-10 sm:py-16 space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <Link to="/simplified-guide" className="hover:text-foreground transition-colors">
            الدليل المبسّط
          </Link>
          <span>/</span>
          <span className="text-foreground">المصادر</span>
        </div>
        <Sources />
      </main>
      <SiteFooter />
    </div>
  );
}
