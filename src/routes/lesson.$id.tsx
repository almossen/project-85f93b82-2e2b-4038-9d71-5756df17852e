import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ShieldCheck, Play, Headphones, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { FaithSection } from "@/components/sama/FaithSection";
import { ReassuranceSection } from "@/components/sama/ReassuranceSection";
import { DiabetesExplanation } from "@/components/sama/DiabetesExplanation";

import { WhatToLearnFirst } from "@/components/sama/WhatToLearnFirst";
import { VideoScript } from "@/components/sama/VideoScript";
import { SimplifiedVersion } from "@/components/sama/SimplifiedVersion";
import { LessonSummary } from "@/components/sama/LessonSummary";
import { Sources } from "@/components/sama/Sources";
import { AskDoctorReminder } from "@/components/sama/AskDoctorReminder";
import { WarningSigns } from "@/components/sama/WarningSigns";
import { Glossary } from "@/components/sama/Glossary";
import { Faq } from "@/components/sama/Faq";
import { FamilyStory } from "@/components/sama/FamilyStory";
import { AudioLesson } from "@/components/sama/AudioLesson";

export const Route = createFileRoute("/lesson/$id")({
  head: () => ({
    meta: [
      { title: "الدرس الأول: بداية الرحلة مع سكري النوع الأول — سما" },
      {
        name: "description",
        content:
          "الدرس الأول من منصة سما — بداية الرحلة مع سكري النوع الأول: افتتاح إيماني، شرح مبسّط، وتصحيح للمفاهيم الشائعة بمحتوى بانتظار الاعتماد الطبي.",
      },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
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
                الدرس ٠١ — الوحدة الأولى
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
              بداية الرحلة مع سكري النوع الأول
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-loose max-w-2xl">
              درس مبسّط لأهالي الأطفال المُشخَّصين حديثاً. نبدأ بوقفة إيمانية هادئة، ثم نشرح ما يحدث داخل جسم ابنكم، ونصحّح بعض المفاهيم الشائعة — كل ذلك في خمس دقائق فقط.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#faith"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
              >
                <Play className="h-4 w-4 fill-current" />
                ابدأ الدرس
              </a>
              <a
                href="#audio-lesson"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card px-6 py-3 text-base font-semibold text-primary hover:bg-primary/10 transition-colors"
              >
                <Headphones className="h-4 w-4" />
                ابدأ الدرس صوتياً
              </a>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-16">
          {/* 0. الدرس صوتياً */}
          <AudioLesson />

          {/* 1. الافتتاح الإيماني */}
          <div id="faith"><FaithSection /></div>

          {/* 2. رسالة الطمأنة */}
          <ReassuranceSection />

          {/* 3. الشرح الطبي المبسط */}
          <div id="explanation"><DiabetesExplanation /></div>


          {/* 5. ماذا نتعلم أولاً؟ */}
          <WhatToLearnFirst />

          {/* 6. نص الفيديو القصير */}
          <VideoScript />

          {/* 7. النسخة المبسطة */}
          <div id="simplified"><SimplifiedVersion /></div>

          {/* 8. اختبار نهاية الدرس */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-soft to-mint/30 p-6 sm:p-8 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">اختبر فهمك</h2>
            <p className="text-muted-foreground leading-loose max-w-xl mx-auto">
              ٥ أسئلة قصيرة — لا توجد علامات، فقط للتأكد أن المعلومة وصلت.
            </p>
            <Link
              to="/quiz/$id"
              params={{ id }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              ابدأ الاختبار
            </Link>
          </div>

          {/* 9. ملخص الدرس + 10. الدرس القادم */}
          <LessonSummary />

          {/* أقسام داعمة إضافية */}
          <WarningSigns />
          <FamilyStory />
          <Glossary />
          <Faq />
          <Sources />
          <AskDoctorReminder />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
