import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DeepDiveEnrichment } from "@/components/sama/DeepDiveEnrichment";
import { AskDoctorReminder } from "@/components/sama/AskDoctorReminder";

export const Route = createFileRoute("/family-tools")({
  head: () => ({
    meta: [
      { title: "أدوات جاهزة للأسرة — سما" },
      {
        name: "description",
        content:
          "قوالب وأسئلة وقوائم عملية للأسرة بعد تشخيص سكري النوع الأول: رسالة للطبيب، أسئلة أول موعد، دفتر ملاحظات، وروتين ليلي.",
      },
      { property: "og:title", content: "أدوات جاهزة للأسرة — سما" },
      {
        property: "og:description",
        content:
          "قوالب وأسئلة وقوائم عملية جاهزة للنسخ والطباعة تساعدك في الأيام الأولى بعد تشخيص طفلك.",
      },
    ],
  }),
  component: FamilyToolsPage,
});

function FamilyToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <nav className="text-sm text-muted-foreground flex items-center gap-2 print:hidden">
        <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        <span className="text-foreground">أدوات جاهزة للأسرة</span>
      </nav>

      <header className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">أدوات جاهزة للأسرة</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-loose">
          مجموعة قوالب وقوائم عملية جاهزة للنسخ والطباعة، تساعدكم في التواصل مع الفريق الطبي
          وتنظيم الأيام الأولى بعد التشخيص.
        </p>
      </header>

      <DeepDiveEnrichment />

      <AskDoctorReminder />

      <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
        <Link
          to="/simplified-guide"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
        >
          العودة إلى الدليل المبسّط
        </Link>
        <Link
          to="/what-to-do-now"
          className="inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground px-4 py-2 text-sm font-semibold hover:bg-destructive/90 transition-colors"
        >
          ماذا أفعل الآن؟
        </Link>
      </div>
    </div>
  );
}
