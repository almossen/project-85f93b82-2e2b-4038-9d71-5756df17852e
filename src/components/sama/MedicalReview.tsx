import { ShieldCheck, Stethoscope } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { medicalReview as review, isMedicallyReviewedRevision } from "@/data/medicalReview";

type Props = {
  variant?: "badge" | "line" | "detail";
  className?: string;
  revisionDate: string;
};

const linkClass = "inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4";

export function MedicalReview({ variant = "badge", className = "", revisionDate }: Props) {
  if (!isMedicallyReviewedRevision(revisionDate)) {
    return <p className={`text-sm leading-loose text-muted-foreground ${className}`}>لم تُحدّد لهذا المحتوى نسخة مشمولة بالمراجعة الطبية؛ يحتاج مراجعة مستقلة قبل نسبته إلى المراجعين.</p>;
  }
  if (variant === "line") {
    return (
      <div data-medical-review="line" className={`mx-auto text-center text-sm ${className}`}>
        <Link to="/about" hash={review.anchor} className={linkClass}>المراجعة الطبية</Link>
      </div>
    );
  }
  if (variant === "detail") {
    return (
      <div data-medical-review="detail" className={`space-y-5 ${className}`}>
        <div className="flex items-center gap-2">
          <ShieldCheck aria-hidden="true" className="h-6 w-6 shrink-0 text-primary" />
          <h2 className="text-xl sm:text-2xl font-bold">{review.heading}</h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {review.reviewers.map((r) => (
            <li key={r.name} className="h-full rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] text-right">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary mb-3">
                <Stethoscope aria-hidden="true" className="h-5 w-5" />
              </div>
              <p className="font-bold text-foreground">{r.name}</p>
              <p className="text-sm leading-loose text-muted-foreground max-sm:text-base max-sm:leading-7">{r.specialty}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm font-semibold leading-loose text-foreground max-sm:text-base max-sm:leading-7">{review.disclaimer}</p>
      </div>
    );
  }
  return (
    <div data-medical-review="badge" className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-right ${className}`}>
      <span className="inline-flex items-center gap-2 rounded-full bg-mint/30 px-3 py-1 text-sm font-semibold text-mint-foreground">
        <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
        {review.summary}
      </span>
      <Link to="/about" hash={review.anchor} className={`${linkClass} text-sm`}>تفاصيل المراجعة</Link>
    </div>
  );
}
