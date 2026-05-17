import { createFileRoute } from "@tanstack/react-router";
import { Clock, ShieldCheck, Play, Headphones } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { FaithSection } from "@/components/sama/FaithSection";
import { ReassuranceSection } from "@/components/sama/ReassuranceSection";
import { DiabetesExplanation } from "@/components/sama/DiabetesExplanation";
import { MythsSection } from "@/components/sama/MythsSection";
import { LearningPath } from "@/components/sama/LearningPath";
import { VideoScript } from "@/components/sama/VideoScript";
import { SimplifiedVersion } from "@/components/sama/SimplifiedVersion";
import { Quiz } from "@/components/sama/Quiz";
import { LessonSummary } from "@/components/sama/LessonSummary";
import { Sources } from "@/components/sama/Sources";
import { AskDoctorReminder } from "@/components/sama/AskDoctorReminder";
import { WarningSigns } from "@/components/sama/WarningSigns";
import { Glossary } from "@/components/sama/Glossary";
import { Faq } from "@/components/sama/Faq";
import { FamilyStory } from "@/components/sama/FamilyStory";

export const Route = createFileRoute("/lesson/$id")({
  head: () => ({
    meta: [
      { title: "الدرس الأول: فهم المرض — سما" },
      { name: "description", content: "الدرس الأول من منصة سما — ما هو سكري النوع الأول، بلغة مبسّطة ومحتوى مراجَع طبياً." },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 text-right space-y-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                المحطة ٠١
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur border border-border px-3 py-1 text-xs font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                بانتظار الاعتماد الطبي
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card/80 backdrop-blur border border-border px-3 py-1 text-xs font-medium">
                <Clock className="h-3.5 w-3.5" />
                مدة الدرس: ٥ دقائق
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.2]">
              فهم المرض: ما هو سكري النوع الأول؟
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-loose max-w-2xl">
              درس مبسّط لأهالي الأطفال المُشخَّصين حديثاً. سنبدأ بوقفة هادئة، ثم نشرح ما يحدث داخل جسم ابنكم، ونكسر بعض المعتقدات الشائعة — كل ذلك في خمس دقائق فقط.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#explanation"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
              >
                <Play className="h-4 w-4 fill-current" />
                ابدأ الدرس
              </a>
              <a
                href="#simplified"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-semibold hover:bg-muted transition-colors"
              >
                <Headphones className="h-4 w-4" />
                استمع للنسخة المبسّطة
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-16">
          <FaithSection />
          <ReassuranceSection />
          <div id="explanation"><DiabetesExplanation /></div>
          <MythsSection />
          <WarningSigns />
          <FamilyStory />
          <LearningPath compact />
          <VideoScript />
          <div id="simplified"><SimplifiedVersion /></div>
          <Glossary />
          <Faq />
          <Quiz />
          <LessonSummary />
          <Sources />
          <AskDoctorReminder />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
