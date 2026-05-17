import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { DisclaimerBanner } from "@/components/sama/DisclaimerBanner";
import { MythsSection } from "@/components/sama/MythsSection";

type Q = { q: string; options: string[]; correct: number; why: string };

const questions: Q[] = [
  {
    q: "سكري النوع الأول يعني أن الجسم لا ينتج كمية كافية من ماذا؟",
    options: ["السكر", "الإنسولين", "فيتامين د"],
    correct: 1,
    why: "البنكرياس يتوقّف عن إنتاج الإنسولين بكميات كافية، لذلك يحتاج الطفل إلى إعطائه من الخارج.",
  },
  {
    q: "هل سكري النوع الأول بسبب أكل الحلويات؟",
    options: ["نعم", "لا"],
    correct: 1,
    why: "لا. سكري النوع الأول حالة مناعية ولا علاقة له بأكل الحلويات.",
  },
  {
    q: "هل يحتاج الطفل المصاب إلى الإنسولين؟",
    options: ["نعم", "لا"],
    correct: 0,
    why: "نعم. الإنسولين علاج أساسي ولا يمكن إيقافه إلا بتوجيه الطبيب.",
  },
  {
    q: "هل يستطيع الطفل المصاب أن يعيش حياة طبيعية مع المتابعة؟",
    options: ["نعم", "لا"],
    correct: 0,
    why: "نعم بإذن الله، مع المتابعة الصحيحة يعيش الطفل حياة كاملة: دراسة ولعب ورياضة وسفر.",
  },
  {
    q: "ما أهم شيء يساعد الأسرة في البداية؟",
    options: ["العزلة", "التعلم", "إيقاف العلاج عند تحسن القراءات"],
    correct: 1,
    why: "التعلم خطوة بخطوة هو ما يُحوّل الخوف إلى ثقة وقدرة على إدارة الحالة.",
  },
];

export const Route = createFileRoute("/lesson/$id/quiz")({
  head: () => ({
    meta: [
      { title: "اختبر فهمك — الدرس الأول — سما" },
      {
        name: "description",
        content: "اختبر معلوماتك بعد الدرس الأول من منصة سما — ٥ أسئلة قصيرة بدون علامات، فقط للتأكد أن المعلومة وصلت.",
      },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const { id } = Route.useParams();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DisclaimerBanner />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-hero)] opacity-50" aria-hidden />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 text-right space-y-4">
            <Link
              to="/lesson/$id"
              params={{ id }}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة إلى الدرس
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.2]">
              اختبر فهمك
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-loose max-w-2xl">
              ٥ أسئلة قصيرة — لا توجد علامات، فقط للتأكد أن المعلومة وصلت.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14 space-y-12">
          <MythsSection />
          <div className="space-y-5">
            {questions.map((q, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-start gap-3 mb-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold leading-loose">{q.q}</h3>
                </div>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const selected = answers[i] === oi;
                    const isCorrect = submitted && oi === q.correct;
                    const isWrong = submitted && selected && oi !== q.correct;
                    return (
                      <button
                        key={oi}
                        type="button"
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                        className={`w-full text-right rounded-xl border p-3.5 text-sm transition-all flex items-center justify-between gap-3 ${
                          isCorrect
                            ? "border-success bg-success/10"
                            : isWrong
                            ? "border-destructive bg-destructive/10"
                            : selected
                            ? "border-primary bg-primary-soft"
                            : "border-border hover:border-primary/40 hover:bg-muted/50"
                        }`}
                      >
                        <span>{opt}</span>
                        {isCorrect && <Check className="h-4 w-4 text-success shrink-0" />}
                        {isWrong && <X className="h-4 w-4 text-destructive shrink-0" />}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-3 text-sm text-muted-foreground leading-loose bg-muted/50 rounded-xl p-3">
                    <strong className="text-foreground">
                      {answers[i] === q.correct ? "أحسنت — " : "لا بأس، راجع المعلومة بهدوء: "}
                    </strong>
                    {q.why}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              عرض النتيجة
            </button>
          ) : (
            <div className="rounded-2xl bg-gradient-to-br from-primary-soft to-mint/30 border border-border p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-muted-foreground">نتيجتك</p>
                <p className="text-2xl font-bold">
                  {score} <span className="text-muted-foreground text-base font-normal">من {questions.length}</span>
                </p>
                <p className="text-sm mt-1">
                  {score === questions.length
                    ? "ممتاز! المعلومة وصلت بوضوح."
                    : score >= questions.length / 2
                    ? "جيد جداً — راجع التفسير لمراجعة النقاط الباقية."
                    : "لا بأس، ارجع للدرس وأعد المحاولة بهدوء."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-muted"
              >
                <RefreshCw className="h-4 w-4" />
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* Back to lesson link */}
          <div className="pt-6 border-t border-border">
            <Link
              to="/lesson/$id"
              params={{ id }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-medium hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              العودة إلى الدرس
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
