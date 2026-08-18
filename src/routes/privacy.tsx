import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";

const DESCRIPTION =
  "سياسة الخصوصية في منصة سما: لا حسابات، ولا جمع بيانات صحية شخصية، مع توضيح استخدام أدوات تحليل الزيارات والروابط الخارجية.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — سما" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "سياسة الخصوصية — سما" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://t1d-ar.com/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "سياسة الخصوصية — سما" },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/privacy" }],
  }),
  component: PrivacyPage,
});

const points = [
  "لا تطلب سما حاليًا إنشاء حساب أو تسجيل دخول لاستخدام المحتوى.",
  "لا تطلب المنصة إدخال أي بيانات صحية شخصية للاستفادة من المحتوى الحالي.",
  "قد تستخدم المنصة أدوات تحليل زيارات عامة لتحسين تجربة المستخدم وتطوير المحتوى.",
  "لا تُستخدم أي بيانات لأغراض بيع إعلاني.",
  "الروابط الخارجية (مثل مواقع الجهات الطبية أو مواقع الأجهزة) لها سياسات خصوصية مستقلة، ولا تتحمل سما مسؤوليتها.",
];

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 print:hidden">
          <Link to="/" className="inline-flex items-center min-h-11 px-1 hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <ArrowRight className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
          <span className="text-foreground">سياسة الخصوصية</span>
        </nav>

        <header className="space-y-3 text-center">
          <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary-soft text-primary">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">سياسة الخصوصية — سما</h1>
          <p className="text-muted-foreground leading-loose">
            نحرص على أن تكون تجربتكم في «سما» بسيطة وآمنة، وأن تبقى بيانات أسركم وأطفالكم لديكم.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">ماذا نجمع وماذا لا نجمع؟</h2>
          <ul className="space-y-3">
            {points.map((p) => (
              <li
                key={p}
                className="rounded-2xl border border-border bg-card p-4 text-sm sm:text-base leading-loose"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border-2 border-warning bg-warning/10 p-4 sm:p-5 space-y-2">
          <h2 className="text-lg font-bold text-warning-foreground">تنبيه مهم قبل مشاركة أي معلومة</h2>
          <p className="text-sm sm:text-base leading-loose text-warning-foreground">
            لا ينبغي إرسال أسماء الأطفال أو قراءات السكر أو جرعات الإنسولين أو نتائج التحاليل أو أي
            معلومات صحية حساسة عبر أي نموذج أو وسيلة تواصل أو تتبع مرتبطة بالمنصة. هذه المعلومات
            مكانها الفريق الطبي المعالج فقط.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">التواصل معنا</h2>
          <p className="text-sm sm:text-base leading-loose text-muted-foreground">
            لأي استفسار يخص الخصوصية أو المحتوى، يمكنكم مراسلتنا:
          </p>
          <a
            href="mailto:sama.t1d.ar@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground min-h-11 hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            sama.t1d.ar@gmail.com
          </a>
        </section>

        <p className="text-sm text-muted-foreground">آخر تحديث للسياسة: أغسطس ٢٠٢٦</p>
      </main>
      <SiteFooter />
    </div>
  );
}
