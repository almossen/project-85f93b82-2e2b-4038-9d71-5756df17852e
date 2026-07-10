import { ExternalLink } from "lucide-react";
import { medicalSources as sources } from "@/data/medicalSources";

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
