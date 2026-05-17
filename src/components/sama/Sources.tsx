import { ExternalLink } from "lucide-react";

const sources = [
  {
    name: "مستشفى الملك فيصل التخصصي",
    detail: "قسم الغدد الصماء للأطفال — أدلة سريرية معتمدة",
    region: "السعودية",
  },
  {
    name: "وزارة الصحة السعودية",
    detail: "الدليل الإرشادي للسكري لدى الأطفال والمراهقين",
    region: "السعودية",
  },
  {
    name: "ISPAD",
    detail: "International Society for Pediatric and Adolescent Diabetes — Guidelines 2024",
    region: "دولي",
  },
  {
    name: "ADA",
    detail: "American Diabetes Association — Standards of Care 2024",
    region: "دولي",
  },
];

export function Sources() {
  return (
    <section className="space-y-5">
      <header className="max-w-2xl mx-auto text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">المصادر العلمية</h2>
        <p className="text-muted-foreground">
          كل معلومة في هذا الدرس مبنية على مصادر طبية موثوقة، ومُراجعة من قِبل مختصين.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 gap-4">
        {sources.map((s) => (
          <article
            key={s.name}
            className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors flex items-start justify-between gap-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{s.name}</h3>
                <span className="text-[10px] font-medium rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  {s.region}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-loose">{s.detail}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
          </article>
        ))}
      </div>
    </section>
  );
}
