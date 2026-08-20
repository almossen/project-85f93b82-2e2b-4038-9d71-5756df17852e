import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DeepDiveEnrichment } from "@/components/sama/DeepDiveEnrichment";
import { AskDoctorReminder } from "@/components/sama/AskDoctorReminder";

export const Route = createFileRoute("/family-tools")({
  head: () => ({
    meta: [
      { title: "أدوات عملية للأسرة — سما" },
      {
        name: "description",
        content:
          "أدوات جاهزة للأسرة بعد تشخيص السكري من النوع الأول: قالب رسالة للفريق الطبي يُنسخ بضغطة، وقائمة أسئلة أول موعد جاهزة للطباعة.",
      },
      { property: "og:title", content: "أدوات عملية للأسرة — سما" },
      {
        property: "og:description",
        content: "قالب رسالة للفريق الطبي وقائمة أسئلة أول موعد — جاهزة للنسخ والطباعة.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://t1d-ar.com/family-tools" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "أدوات عملية للأسرة — سما" },
      {
        name: "twitter:description",
        content: "قالب رسالة للفريق الطبي وقائمة أسئلة أول موعد — جاهزة للنسخ والطباعة.",
      },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/family-tools" }],
  }),
  component: FamilyToolsPage,
});

function FamilyToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <nav className="text-sm text-muted-foreground flex items-center gap-2 print:hidden">
        <Link to="/" className="inline-flex items-center min-h-11 px-1 hover:text-foreground transition-colors">الرئيسية</Link>
        <ArrowRight className="h-3.5 w-3.5 rotate-180" />
        <span className="text-foreground">أدوات عملية للأسرة</span>
      </nav>

      <header className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">أدوات عملية للأسرة</h1>
        <p className="text-muted-foreground max-w-[72ch] mx-auto leading-loose">
          أدوات تستخدمونها وقت الحاجة، لا محتوى تقرؤونه مرة أخرى: قالب رسالة يُنسخ بضغطة، وقائمة
          أسئلة تُطبع وتُؤخذ إلى الموعد. الدروس التعليمية كاملة في الدليل المبسّط.
        </p>
      </header>

      <DeepDiveEnrichment />

      <AskDoctorReminder />

      <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
        <Link
          to="/simplified-guide"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 min-h-11 text-sm font-semibold hover:bg-muted transition-colors"
        >
          العودة إلى الدليل المبسّط
        </Link>
        <Link
          to="/what-to-do-now"
          className="inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground px-4 py-2.5 min-h-11 text-sm font-semibold hover:bg-destructive/90 transition-colors"
        >
          ماذا أفعل الآن؟
        </Link>
      </div>
      </main>
      <SiteFooter />
    </div>
  );
}
