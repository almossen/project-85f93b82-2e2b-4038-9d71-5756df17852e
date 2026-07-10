import { ExternalLink } from "lucide-react";

const sources = [
  {
    name: "وزارة الصحة السعودية",
    detail: "داء السكري من النوع الأول — المحتوى التثقيفي الرسمي",
    region: "السعودية",
    url: "https://www.moh.gov.sa/HealthAwareness/EducationalContent/Diseases/diabetic/Pages/009.aspx",
  },
  {
    name: "وزارة الصحة السعودية",
    detail: "صحة الطفل — السكري والأطفال",
    region: "السعودية",
    url: "https://www.moh.gov.sa/healthawareness/educationalcontent/babyhealth/pages/diabetes-and-children.aspx",
  },
  {
    name: "ISPAD",
    detail: "Clinical Practice Consensus Guidelines 2024 (الجمعية الدولية لسكري الأطفال والمراهقين)",
    region: "دولي",
    url: "https://www.ispad.org/resources/ispad-clinical-practice-consensus-guidelines/2024-cpcg.html",
  },
  {
    name: "CDC — مراكز مكافحة الأمراض الأمريكية",
    detail: "Type 1 Diabetes — تعريف، أعراض، وعلاج",
    region: "دولي",
    url: "https://www.cdc.gov/diabetes/about/about-type-1-diabetes.html",
  },
  {
    name: "وزارة الصحة السعودية",
    detail: "انخفاض السكر — التعامل الأولي والتنبيه عند الإغماء",
    region: "السعودية",
    url: "https://www.moh.gov.sa/healthawareness/educationalcontent/diseases/diabetic/pages/hypoglycemia-low-blood-glucose-levels.aspx",
  },
  {
    name: "هيئة الهلال الأحمر السعودي",
    detail: "البلاغات الإسعافية في السعودية — 997",
    region: "السعودية",
    url: "https://www.srca.org.sa/contact-us/",
  },
  {
    name: "CDC — رعاية الأطفال",
    detail: "3 Ways to Help Manage Your Child's Type 1 Diabetes",
    region: "دولي",
    url: "https://www.cdc.gov/diabetes/caring/3-ways-help-manage-childs-type-1.html",
  },
  {
    name: "Mayo Clinic",
    detail: "داء السكري من النوع الأول عند الأطفال — الأعراض والأسباب (بالعربية)",
    region: "دولي",
    url: "https://www.mayoclinic.org/ar/diseases-conditions/type-1-diabetes-in-children/symptoms-causes/syc-20355306",
  },
];

export function Sources() {
  return (
    <section className="space-y-5">
      <header className="max-w-2xl mx-auto text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">المصادر العلمية</h2>
        <p className="text-muted-foreground">
          هذه قائمة مصادر موثوقة للاستئناس وبناء المحتوى، ويجب اعتماد الصياغة النهائية من مختص قبل النشر العام.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 gap-4">
        {sources.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:bg-muted/40 transition-colors flex items-start justify-between gap-3 group"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{s.name}</h3>
                <span className="text-[10px] font-medium rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {s.region}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-loose">{s.detail}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
