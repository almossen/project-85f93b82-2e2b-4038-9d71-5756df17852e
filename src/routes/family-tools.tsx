import { MedicalReview } from "@/components/sama/MedicalReview";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, Download, FileText, GraduationCap, Info, ContactRound, Stethoscope } from "lucide-react";
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
            "نسخ جاهزة للتحميل لتعريف زملاء الطفل بالسكري من النوع الأول، ودليلان مدرسيان للمعلم والمعلمة جاهزان للطباعة، وبرومبت لإنشاء نسخة خاصة باستخدام الذكاء الاصطناعي، مع قالب رسالة للفريق الطبي وأسئلة أول موعد.",
        },
      { property: "og:title", content: "أدوات عملية للأسرة — سما" },
      {
        property: "og:description",
        content: "نسخ الأولاد والبنات ودليلي المعلم والمعلمة جاهزة للتحميل والطباعة، وإنشاء نسخة خاصة لطفلك بالذكاء الاصطناعي، مع أدوات التواصل مع الفريق الطبي وأسئلة الموعد.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://t1d-ar.com/family-tools" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "أدوات عملية للأسرة — سما" },
      {
        name: "twitter:description",
        content: "نسخ جاهزة للتحميل ودليلان مدرسيان للطباعة وإنشاء نسخة خاصة لطفلك بالذكاء الاصطناعي، مع أدوات التواصل مع الفريق الطبي وأسئلة الموعد.",
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

        <MedicalReview />

      <header className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">أدوات عملية للأسرة</h1>
        <p className="text-base text-muted-foreground max-w-[72ch] mx-auto leading-loose">
          جمعنا لكم هنا أدوات بسيطة تساعدكم في يومكم مع السكري من النوع الأول: سجل لقراءات السكر
          المرتبطة بالوجبات، وبطاقات لتعريف الآخرين بحالة طفلكم، وأدلة للمعلم والمعلمة، وقوالب للتواصل
          مع الفريق الطبي والاستعداد للموعد. اختاروا ما يناسب احتياجكم، وحمّلوا المواد المتاحة للطباعة
          أو المشاركة.
        </p>
      </header>

      <section aria-labelledby="meal-log-title" className="space-y-5 border-y border-primary/20 pb-8 print:hidden">
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 bg-primary-soft px-4 py-5 sm:px-6">
          <FileText aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-primary" />
          <div className="min-w-0 space-y-2">
            <h2 id="meal-log-title" className="text-2xl font-bold leading-relaxed text-primary">
              سجل متابعة قراءة السكر للوجبات
            </h2>
            <p className="text-sm leading-loose text-muted-foreground sm:text-base">
              سجل قابل للطباعة يضم أربع صفحات، صفحة لكل أسبوع. دوّنوا فيه اليوم والتاريخ وقراءات السكر
              المرتبطة بالوجبات، مع مساحة للملاحظات، لتبقى القراءات مرتبة ويسهل الرجوع إليها عند
              الحاجة، ولإحضاره معكم للموعد الأول.
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:p-5">
          <img
            src="/family-tools/sama-meal-glucose-log-preview.png"
            alt="معاينة الصفحة الأولى من سجل متابعة قراءة السكر للوجبات"
            width={595}
            height={842}
            loading="lazy"
            className="mx-auto h-52 w-auto rounded-md border border-border object-contain sm:mx-0"
          />
          <div className="flex flex-1 flex-col items-start gap-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <FileText aria-hidden="true" className="h-4 w-4" />
              PDF · ٤ صفحات · A4 · قابل للطباعة
            </p>
            <Button asChild className="h-auto min-h-12 whitespace-normal py-3 text-base">
              <a href="/family-tools/sama-meal-glucose-log.pdf" download="sama-meal-glucose-log.pdf">
                <Download aria-hidden="true" /> تحميل السجل PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

       <section aria-labelledby="child-cards-title" className="space-y-6 border-y border-primary/20 pb-8 print:hidden"><header className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 bg-primary-soft px-4 py-5 sm:px-6 print:hidden">
 <ContactRound aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-primary" />
 <div className="min-w-0 space-y-2">
 <h2 id="child-cards-title" className="text-2xl font-bold leading-relaxed text-primary">بطاقات التعريف بالسكري لطفلك</h2>
 <p className="text-sm sm:text-base text-muted-foreground leading-loose">بطاقة بسيطة ومطمئنة لتعريف زملاء طفلكم ومن حوله بالسكري: حمّلوا نسخة جاهزة أو أنشئوا بطاقة خاصة به.</p>
 </div></header>
<section aria-labelledby="downloads-title" className="space-y-5 print:hidden">
         <div className="space-y-2">
           <h3 id="downloads-title" className="text-xl font-bold text-primary">حمّل بطاقة جاهزة</h3>
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
                 <h4 className="text-lg font-bold">{version.title}</h4>
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

       <section aria-labelledby="custom-version-title" className="space-y-5 border-t border-primary/20 pt-8 print:hidden">
         <div className="space-y-2">
           <h3 id="custom-version-title" className="text-xl font-bold leading-relaxed text-primary">أنشئ بطاقة خاصة بطفلك</h3>
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
               <h4 className="text-lg font-bold"><bdi>{tool}</bdi></h4>
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

       </section>

<section aria-labelledby="teacher-guide-title" className="space-y-6 border-y border-kids/20 pb-8 print:hidden">
         <header className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 bg-kids-soft px-4 py-5 sm:px-6 print:hidden">
 <GraduationCap aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-kids-foreground" />
 <div className="min-w-0 space-y-2">
 <h2 id="teacher-guide-title" className="text-2xl font-bold leading-relaxed text-kids-foreground">أدلة المدرسة للمعلم والمعلمة</h2>
 <p className="text-sm sm:text-base text-muted-foreground leading-loose">دليل المدرسة لدعم الطالب والطالبة المصابين بالسكري من النوع الأول: دليل عملي جاهز للطباعة يساعد الأسرة على تزويد المدرسة بالمعلومات الأساسية للتعامل الآمن والداعم خلال اليوم الدراسي.</p>
 </div></header>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
           {[
             {
               key: "boys",
               title: "دليل المعلم — مدارس الأولاد",
               badge: "نسخة الأولاد",
               description: "مرجع مبسّط يساعد المعلم والممرض المدرسي والموظف المدرّب على دعم الطالب، والتعامل مع الحساس، وانخفاض وارتفاع سكر الدم، والرياضة، والرحلات والحالات الطارئة.",
               meta: "PDF · 12 صفحة · A4 · قابل للطباعة · 1.7 MB",
               pdf: "/family-tools/sama-teacher-guide-boys.pdf",
               downloadName: "sama-teacher-guide-boys.pdf",
               cover: "/family-tools/sama-teacher-guide-boys-cover.png",
               coverWidth: 1075,
               coverHeight: 1521,
               alt: "غلاف دليل المعلم لدعم الطالب المصاب بالسكري من النوع الأول في مدارس الأولاد",
               accentClass: "border-t-4 border-primary",
               badgeClass: "bg-primary-soft text-primary",
               ariaLabel: "تحميل دليل مدارس الأولاد",
             },
             {
               key: "girls",
               title: "دليل المعلمة — مدارس البنات",
               badge: "نسخة البنات",
               description: "مرجع مبسّط يساعد المعلمة والممرضة المدرسية والموظفة المدرّبة على دعم الطالبة، والتعامل مع الحساس، وانخفاض وارتفاع سكر الدم، والرياضة، والرحلات والحالات الطارئة.",
               meta: "PDF · 12 صفحة · A4 · قابل للطباعة · 2.9 MB",
               pdf: "/family-tools/sama-teacher-guide-girls.pdf",
               downloadName: "sama-teacher-guide-girls.pdf",
               cover: "/family-tools/sama-teacher-guide-girls-cover.png",
               coverWidth: 1034,
               coverHeight: 1462,
               alt: "غلاف دليل المعلمة لدعم الطالبة المصابة بالسكري من النوع الأول في مدارس البنات",
               accentClass: "border-t-4 border-kids",
               badgeClass: "bg-kids-soft text-kids-foreground",
               ariaLabel: "تحميل دليل مدارس البنات",
             },
           ].map((guide) => (
             <article key={guide.key} className={`flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)] ${guide.accentClass}`}>
               <img src={guide.cover} alt={guide.alt} width={guide.coverWidth} height={guide.coverHeight} loading="lazy" className="block h-64 w-full bg-muted/40 object-contain p-3 sm:h-72" />
               <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                 <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                   <h3 className="min-w-0 text-lg font-bold leading-relaxed">{guide.title}</h3>
                   <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${guide.badgeClass}`}>
                     <GraduationCap aria-hidden="true" className="h-3.5 w-3.5" />
                     {guide.badge}
                   </span>
                 </div>
                 <p className="text-sm text-muted-foreground leading-loose">{guide.description}</p>
                 <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                   <FileText aria-hidden="true" className="h-4 w-4" />
                   {guide.meta}
                 </p>
                 <Button asChild aria-label={guide.ariaLabel} className="mt-auto h-auto min-h-12 whitespace-normal py-3 text-base">
                   <a href={guide.pdf} download={guide.downloadName}>
                     <Download aria-hidden="true" /> {guide.ariaLabel}
                   </a>
                 </Button>
               </div>
             </article>
           ))}
         </div>
         <div className="space-y-3 border-s-4 border-kids/30 bg-kids-soft/40 p-4 sm:p-5">
           <h3 className="font-bold text-lg">قبل مشاركة الدليل مع المدرسة</h3>
           <ol className="list-decimal space-y-1.5 ps-6 leading-loose marker:font-bold marker:text-primary">
             <li>عبّئوا بطاقة المعلم السريعة بالمعلومات الخاصة بالطالب أو الطالبة.</li>
             <li>شاركوا نسخة مع إدارة المدرسة والمعلم أو المعلمة والممرض أو الممرضة المدرسية.</li>
             <li>حدّثوا المعلومات عند تغير خطة الرعاية أو أرقام التواصل أو تعليمات الفريق الطبي.</li>
           </ol>
           <p className="flex items-start gap-2 text-sm font-semibold text-foreground leading-loose">
             <Info aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
             هذا الدليل مادة تثقيفية مساندة، ولا يستبدل خطة الرعاية الفردية للطالب أو الطالبة، أو تعليمات الفريق الطبي، أو سياسات المدرسة المعتمدة.
           </p>
         </div>
       </section>

       <section aria-labelledby="medical-team-title" className="space-y-5 border-y border-mint-foreground/20 pb-6 print:border-0"><header className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 bg-mint/30 px-4 py-5 sm:px-6 print:hidden">
 <Stethoscope aria-hidden="true" className="mt-1 h-7 w-7 shrink-0 text-mint-foreground" />
 <div className="min-w-0 space-y-2">
 <h2 id="medical-team-title" className="text-2xl font-bold leading-relaxed text-mint-foreground">التواصل مع الفريق الطبي والاستعداد للموعد</h2>
 
 </div></header><div className="[&>section]:rounded-none [&>section]:border-0 [&>section]:bg-transparent [&>section]:p-0 [&>section]:shadow-none [&_#deep-dive>header>span]:hidden [&_#deep-dive>header_h2]:hidden"><DeepDiveEnrichment /></div></section>

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

