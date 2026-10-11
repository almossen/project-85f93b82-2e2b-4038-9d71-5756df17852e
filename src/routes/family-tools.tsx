import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
          "نسخ جاهزة للتحميل لتعريف زملاء الطفل بالسكري من النوع الأول، وبرومبت لإنشاء نسخة خاصة باستخدام الذكاء الاصطناعي، مع قالب رسالة للفريق الطبي وأسئلة أول موعد.",
      },
      { property: "og:title", content: "أدوات عملية للأسرة — سما" },
      {
        property: "og:description",
        content: "نسخ الأولاد والبنات جاهزة للتحميل، وإنشاء نسخة خاصة لطفلك بالذكاء الاصطناعي، مع أدوات التواصل مع الفريق الطبي وأسئلة الموعد.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://t1d-ar.com/family-tools" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "أدوات عملية للأسرة — سما" },
      {
        name: "twitter:description",
        content: "نسخ جاهزة للتحميل وإنشاء نسخة خاصة لطفلك بالذكاء الاصطناعي، مع أدوات التواصل مع الفريق الطبي وأسئلة الموعد.",
      },
    ],
    links: [{ rel: "canonical", href: "https://t1d-ar.com/family-tools" }],
  }),
  component: FamilyToolsPage,
});

function FamilyToolsPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("ولد");
  const [hobbies, setHobbies] = useState("");
  const [cgm, setCgm] = useState("نعم");
  const [imageStyle, setImageStyle] = useState("كرتونية");
  const [copyMessage, setCopyMessage] = useState("");

  async function copyPrompt(tool: string) {
    const prompt = `الأداة المختارة: ${tool}.\nأنشئ إنفوجرافيك عربيًا من صفحة واحدة، مناسبًا للأطفال وبأسلوب لطيف ومطمئن، يعرّف زملاء الطفل بالسكري من النوع الأول ويوضح أن الطفل يستطيع الدراسة واللعب بشكل طبيعي، وقد يحتاج أحيانًا إلى تناول شيء أو شربه أو التوقف قليلًا أو طلب مساعدة شخص بالغ. استخدم صورة الطفل المرفوعة وفق نمط الصورة المحدد، ولا تغيّر ملامحه إذا اخترنا الصورة الأصلية. اجعل التصميم واضحًا للطباعة والمشاركة الرقمية، واترك النص العربي مقروءًا ومنظمًا. بيانات التخصيص: اسم الطفل: ${name.trim() || "[اكتب الاسم]"}؛ الجنس: ${gender}؛ الهوايات: ${hobbies.trim() || "[اكتب الهوايات]"}؛ يستخدم جهاز مراقبة السكر المستمر CGM: ${cgm}؛ نمط الصورة: ${imageStyle}. لا تضف معلومات طبية فردية أو جرعات علاجية.`;
    setCopyMessage("");
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyMessage(`تم نسخ برومبت ${tool} بنجاح.`);
    } catch {
      setCopyMessage("تعذّر النسخ. اسمحوا للمتصفح بالوصول إلى الحافظة ثم حاولوا مرة أخرى.");
    }
  }

  const fieldClass = "mt-2 min-h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

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

       <section aria-labelledby="downloads-title" className="space-y-5 print:hidden">
         <div className="space-y-2">
           <h2 id="downloads-title" className="text-2xl font-bold">نسخ جاهزة للتحميل</h2>
           <p className="text-muted-foreground leading-loose">
             بطاقات تساعد طفلكم على التعريف بالسكري من النوع الأول لزملائه ومن حوله بطريقة بسيطة ومطمئنة، ويمكن طباعتها أو مشاركتها رقميًا.
           </p>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
           {[
             { key: "boys", title: "نسخة الأولاد", description: "نسخة مبسطة تساعد الطفل على تعريف من حوله بالسكري من النوع الأول.", alt: "بطاقة نسخة الأولاد: طفل يعرّف زملاءه بالسكري من النوع الأول وبجهاز مراقبة السكر واللعب وطلب مساعدة شخص بالغ.", width: 1055, height: 1491 },
             { key: "girls", title: "نسخة البنات", description: "نسخة مبسطة تساعد الطفلة على تعريف من حولها بالسكري من النوع الأول.", alt: "بطاقة نسخة البنات: طفلة تعرّف زملاءها بالسكري من النوع الأول وبجهاز مراقبة السكر واللعب وطلب مساعدة شخص بالغ.", width: 1054, height: 1492 },
           ].map((version) => (
             <article key={version.key} className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)]">
               <img src={`/family-tools/sama-${version.key}-t1d-infographic.png`} alt={version.alt} width={version.width} height={version.height} loading="lazy" className="block h-auto w-full" />
               <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                 <h3 className="text-xl font-bold">{version.title}</h3>
                 <p className="text-sm text-muted-foreground leading-loose">{version.description}</p>
                 <Button asChild className="mt-auto h-auto min-h-12 whitespace-normal py-3 text-base">
                   <a href={`/family-tools/sama-${version.key}-t1d-infographic.png`} download={`sama-${version.key}-t1d-infographic.png`}>
                     <Download aria-hidden="true" /> تحميل {version.title}
                   </a>
                 </Button>
               </div>
             </article>
           ))}
         </div>
       </section>

       <section aria-labelledby="custom-version-title" className="space-y-5 border-t border-border pt-8 print:hidden">
         <div className="space-y-2">
           <h2 id="custom-version-title" className="text-2xl font-bold leading-relaxed">أنشئ نسخة خاصة لطفلك باستخدام الذكاء الاصطناعي</h2>
           <p className="text-muted-foreground leading-loose">يمكنكم رفع صورة طفلكم مباشرة إلى خدمة ذكاء اصطناعي خارجية، ثم نسخ البرومبت الجاهز وتعبئة بيانات الطفل لإنشاء نسخة خاصة به.</p>
         </div>
         <ol className="list-decimal space-y-2 ps-6 leading-loose marker:font-bold marker:text-primary">
           <li>اختر ChatGPT أو Gemini / Nano Banana.</li>
           <li>ارفع صورة الطفل إلى الخدمة المختارة.</li>
           <li>انسخ البرومبت المناسب وعدّل الحقول.</li>
           <li>أنشئ النسخة ثم راجع النص قبل الطباعة أو المشاركة.</li>
         </ol>
         <fieldset className="space-y-3">
           <legend className="font-bold text-lg">بيانات التخصيص</legend>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <label className="text-sm font-semibold">اسم الطفل
               <input className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} placeholder="اكتب الاسم" autoComplete="off" />
             </label>
             <label className="text-sm font-semibold">الجنس
               <select className={fieldClass} value={gender} onChange={(event) => setGender(event.target.value)}><option>ولد</option><option>بنت</option></select>
             </label>
             <label className="text-sm font-semibold sm:col-span-2">الهوايات
               <input className={fieldClass} value={hobbies} onChange={(event) => setHobbies(event.target.value)} placeholder="اكتب الهوايات" autoComplete="off" />
             </label>
             <label className="text-sm font-semibold">هل يستخدم CGM؟
               <select className={fieldClass} value={cgm} onChange={(event) => setCgm(event.target.value)}><option>نعم</option><option>لا</option></select>
             </label>
             <label className="text-sm font-semibold">نمط الصورة
               <select className={fieldClass} value={imageStyle} onChange={(event) => setImageStyle(event.target.value)}><option>كرتونية</option><option>الصورة الأصلية</option></select>
             </label>
           </div>
         </fieldset>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {["ChatGPT", "Gemini / Nano Banana"].map((tool) => (
             <article key={tool} className="min-w-0 space-y-3 rounded-lg border border-border bg-card p-5">
               <h3 className="text-lg font-bold"><bdi>{tool}</bdi></h3>
               <Button onClick={() => copyPrompt(tool)} aria-label={`نسخ البرومبت المخصص لأداة ${tool}`} className="h-auto min-h-12 w-full whitespace-normal py-3 text-base">
                 <Copy aria-hidden="true" /> نسخ البرومبت
               </Button>
             </article>
           ))}
         </div>
         <p role="status" aria-live="polite" aria-atomic="true" className="text-sm font-semibold text-primary">{copyMessage}</p>
         <div className="space-y-2 border-s-4 border-mint ps-4 text-sm text-muted-foreground leading-loose">
           <p>عند استخدام هذه الطريقة، تُرفع صورة الطفل مباشرة إلى خدمة الذكاء الاصطناعي التي تختارونها وفق سياسة الخصوصية الخاصة بها، ولا تُرفع الصورة إلى منصة سما.</p>
           <p>راجِعوا النص العربي قبل الطباعة أو المشاركة؛ فقد تخطئ أدوات الذكاء الاصطناعي أحيانًا في الكلمات أو التفاصيل.</p>
         </div>
       </section>

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
