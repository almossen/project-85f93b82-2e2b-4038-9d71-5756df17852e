import { ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { medicalReview as review, isMedicallyReviewedRevision } from "@/data/medicalReview";

type Props = {
  variant?: "card" | "badge" | "line" | "detail";
  className?: string;
  revisionDate: string;
};

export function MedicalReview({ variant = "badge", className = "", revisionDate }: Props) {
  if (!isMedicallyReviewedRevision(revisionDate)) {
    return <p className={`text-sm leading-loose text-muted-foreground ${className}`}>لم تُحدّد لهذا المحتوى نسخة مشمولة بالمراجعة الطبية؛ يحتاج مراجعة مستقلة قبل نسبته إلى الطبيب.</p>;
  }
  const detailed = variant === "detail";
  const card = variant === "card";
  const line = variant === "line";
  if (line) {
    return (
      <div data-medical-review="line" className={`mx-auto max-w-[85ch] text-center text-sm leading-loose text-muted-foreground ${className}`}>
        <p className="text-center">تمت مراجعة محتوى المنصة في أكتوبر 2026:  بواسطة د. محسن المغربي — استشاري الغدد الصماء وسكري الأطفال واليافعين.</p>
        <Link to="/about" className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">تفاصيل المراجعة</Link>
      </div>
    );
  }
  return (
    <div data-medical-review={variant} className={`${card ? "h-full rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] text-right" : detailed ? "space-y-4" : line ? "mx-auto max-w-[85ch] space-y-2 text-center" : "max-w-[85ch] space-y-2 text-right"} ${className}`}>
      <div className={`flex items-start gap-2 ${line ? "justify-center" : ""}`}>
        <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-primary" />
        <div className="min-w-0 space-y-1">
          {card ? <h3 className="font-semibold">{review.heading}</h3> : detailed ? <h2 className="text-xl sm:text-2xl font-bold">{review.heading}</h2> : <span className="inline-block rounded-full bg-mint/30 px-3 py-1 text-sm font-semibold text-mint-foreground">{review.heading} · <time dateTime={review.reviewedOn}>{review.displayDate}</time></span>}
          <p className="text-sm font-semibold text-foreground text-right">{review.reviewer} — {review.specialty}</p>
        </div>
      </div>
      {(card || detailed) && <p className="text-sm leading-loose text-muted-foreground text-right"><time dateTime={revisionDate}>{review.displayDate}</time></p>}
      {detailed ? <>
        <p className="text-base leading-loose text-muted-foreground">{review.scope}</p>
        <p className="max-w-[80ch] text-base leading-loose text-muted-foreground">{review.scopeDetail}</p>
        <p className="text-sm leading-loose text-muted-foreground">{review.futureChanges}</p>
        <p className="text-sm leading-loose text-muted-foreground">{review.disclaimer}</p>
      </> : <Link to="/about" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">تفاصيل المراجعة</Link>}
    </div>
  );
}