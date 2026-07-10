export type MedicalSource = {
  name: string;
  detail: string;
  region: "السعودية" | "دولي";
  url: string;
};

export const medicalSources: MedicalSource[] = [
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
    name: "CDC — انخفاض السكر (Hypoglycemia)",
    detail: "Low Blood Sugar (Hypoglycemia) — العلامات والتعامل",
    region: "دولي",
    url: "https://www.cdc.gov/diabetes/signs-symptoms/low-blood-sugar.html",
  },
  {
    name: "CDC — رعاية الأطفال",
    detail: "3 Ways to Help Manage Your Child's Type 1 Diabetes",
    region: "دولي",
    url: "https://www.cdc.gov/diabetes/caring/3-ways-help-manage-childs-type-1.html",
  },
  {
    name: "ADA — American Diabetes Association",
    detail: "Standards of Care in Diabetes — أحدث نسخة سنوية",
    region: "دولي",
    url: "https://diabetesjournals.org/care/issue/48/Supplement_1",
  },
  {
    name: "Mayo Clinic",
    detail: "داء السكري من النوع الأول عند الأطفال — الأعراض والأسباب (بالعربية)",
    region: "دولي",
    url: "https://www.mayoclinic.org/ar/diseases-conditions/type-1-diabetes-in-children/symptoms-causes/syc-20355306",
  },
];
