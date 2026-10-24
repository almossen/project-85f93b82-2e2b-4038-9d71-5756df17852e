import { ShieldCheck } from "lucide-react";
import { medicalReview as review, isMedicallyReviewedRevision } from "@/data/medicalReview";

type Props = {
  variant?: "card" | "badge" | "line" | "detail";
  className?: string;
  revisionDate?: string;
};

export function MedicalReview({ variant = "badge", className = "", revisionDate = review.reviewedOn }: Props) {
  if (!isMedicallyReviewedRevision(revisionDate)) {
    return <p className={`text-sm leading-loose text-muted-foreground ${className}`}>هذا المحتوى المعدّل يحتاج مراجعة طبية مستقلة قبل نسبته إلى الطبيب.</p>;
  }
  const detailed = variant === "detail";
  const card = variant === "card";
  const line = variant === "line";
  return (
    <div data-medical-review={variant} className={`${card ? "h-full rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] text-right" : detailed ? "space-y-4" : line ? "mx-auto max-w-[85ch] space-y-2 text-center" : "max-w-[85ch] space-y-2 text-right"} ${className}`}>
      <div className={`flex items-start gap-2 ${line ? "justify-center" : ""}`}>
        <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div className="min-w-0 space-y-1">
          {card ? <h3 className="font-semibold">{review.heading}</h3> : detailed ? <h2 className="text-xl sm:text-2xl font-bold">{review.heading}</h2> : <span className="inline-block rounded-full bg-mint/30 px-3 py-1 text-sm font-semibold text-mint-foreground">{review.heading} · <time dateTime={review.reviewedOn}>{review.displayDate}</time></span>}
          <p className={`text-sm font-semibold text-foreground ${line ? "text-center" : "text-right"}`}>{review.reviewer}{variant === "badge" ? "" : ` — ${review.specialty}`}</p>
        </div>
      </div>
      <p className={`${detailed ? "text-base" : "text-sm"} leading-loose text-muted-foreground ${line ? "text-center" : "text-right"}`}>{review.scope}</p>
      {detailed && <p className="max-w-[80ch] text-base leading-loose text-muted-foreground">{review.scopeDetail}</p>}
      <p className="text-sm leading-loose text-muted-foreground">{review.futureChanges}</p>
      <p className={`text-sm leading-loose text-muted-foreground ${line ? "text-center" : "text-right"}`}>{review.disclaimer}</p>
    </div>
  );
}