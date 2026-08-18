import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, HeartHandshake, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/sama/SiteHeader";
import { SiteFooter } from "@/components/sama/SiteFooter";
import { Sources } from "@/components/sama/Sources";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن المنصة والمصادر — سما" },
      {
        name: "description",
        content:
          "من نحن، وهدف منصة سما التثقيفية لأسر أطفال سكري النوع الأول، مع المصادر الطبية المعتمدة وأرقام الطوارئ.",
      },
      { property: "og:title", content: "عن منصة سما وهدفها والمصادر" },
      {
        property: "og:description",
        content:
          "فلسفة المنصة، التنويه الطبي، أرقام الطوارئ، والمراجع: وزارة الصحة السعودية، ISPAD، CDC، ADA، Mayo Clinic.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://t1d-ar.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "عن منصة سما وهدفها والمصادر" },
      {
        name: "twitter:description",
        content: "فلسفة المنصة، التنويه الطبي، أرقام الطوارئ، والمراجع الطبية المعتمدة.",
      },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Sparkles,
    title: "تعليم متدرّج",
    text: "دروس قصيرة مرتّبة في فصول، تبدأ من اليوم الأول بعد التشخيص وتتدرّج خطوة بخطوة.",
  },
  {
    icon: HeartHandshake,
    title: "نبرة مطمئنة",
    text: "لغة بسيطة تخاطب الأسرة لا الطبيب، وتقلّل الخوف بدل أن تزيده.",
  },
  {
    icon: ShieldCheck,
    title: "محتوى مُراجَع طبيًا",
    text: "كل المحتوى تمت مراجعته من مختص، ويستند إلى مراجع رسمية ودولية محدّثة.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-8 sm:py-14 space-y-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-foreground">عن المنصة</span>
        </div>

        <header className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">عن منصة سما</h1>
          <p className="text-base sm:text-lg leading-loose text-muted-foreground">
            «سما» منصة عربية تثقيفية صُممت لمساندة أسر الأطفال المشخصين حديثًا بسكري النوع
            الأول، لتحوّل المعلومة الطبية المعقّدة إلى خطوات عملية واضحة يمكن تطبيقها في
            البيت والمدرسة.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-5 space-y-2">
              <p.icon className="h-5 w-5 text-primary" strokeWidth={2.2} />
              <h2 className="font-bold">{p.title}</h2>
              <p className="text-sm leading-loose text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-7 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">تنويه مهم</h2>
          <div className="space-y-3 text-sm sm:text-base leading-loose text-muted-foreground">
            <p>
              منصة <strong className="text-foreground">سما</strong> هي اجتهاد شخصي من ولي أمر
              لطفلة مصابة بالسكري من النوع الأول، أُنشئت بهدف مشاركة المعرفة والخبرة وتسهيل
              الوصول إلى المعلومات التي قد تساعد الأسر في فهم رحلة التعايش مع السكري النوع
              الأول.
            </p>
            <p>
              المنصة <strong className="text-foreground">ليست مشروعًا تجاريًا، ولا تمثل جهة
              طبية أو صحية، ولا تهدف إلى الترويج لأي منتج أو خدمة</strong>.
            </p>
            <p>
              المحتوى المنشور في المنصة ذو طابع <strong className="text-foreground">تثقيفي
              وإرشادي فقط</strong>، وقد روعي في إعداده ومراجعته الاستناد إلى مصادر طبية
              موثوقة، إلا أنه <strong className="text-foreground">لا يُعد بديلًا عن استشارة
              الطبيب أو الفريق الطبي المعالج، ولا ينبغي بناء أي قرار طبي أو تغيير في العلاج
              أو جرعات الإنسولين اعتمادًا على محتوى المنصة وحده</strong>.
            </p>
            <p>
              تختلف حالة كل طفل واحتياجاته العلاجية، ولذلك تبقى القرارات الطبية مسؤولية الفريق
              الطبي المعالج بالتعاون مع الأسرة.
            </p>
            <p>
              نسعد بالملاحظات والتجارب والاقتراحات التي يمكن أن تسهم في تطوير المنصة وتحسين
              محتواها.
            </p>
          </div>
          <div className="pt-1">
            <p className="text-sm text-muted-foreground mb-1">للتواصل:</p>
            <a
              href="mailto:sama.t1d.ar@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 min-h-11 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" strokeWidth={2.2} />
              sama.t1d.ar@gmail.com
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-warning/40 bg-warning/10 p-5 space-y-3">
          <h2 className="font-bold text-warning-foreground">تنويه طبي وأرقام الطوارئ</h2>
          <p className="text-sm sm:text-base leading-loose text-warning-foreground">
            هذا المحتوى تثقيفي وداعم، ولا يغني عن متابعة الطبيب أو فريق السكري؛ لأن خطة العلاج
            تختلف من طفل لآخر. في الحالات الطارئة اتصل بالهلال الأحمر السعودي أو توجه لأقرب
            طوارئ.
          </p>
          <div className="flex flex-wrap gap-2 print:hidden">
            <a
              href="tel:997"
              className="inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-3 min-h-11 text-sm font-bold text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={2.4} />
              اتصال بالإسعاف 997
            </a>
            <a
              href="tel:937"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 min-h-11 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={2.4} />
              استشارات طبية 937
            </a>
            <Link
              to="/what-to-do-now"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 min-h-11 text-sm font-semibold hover:bg-muted transition-colors"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              ماذا أفعل الآن؟
            </Link>
          </div>
        </section>

        <Sources />
      </main>
      <SiteFooter />
    </div>
  );
}
