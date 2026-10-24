import review from "../../public/medical-review.json";

export const medicalReview = Object.freeze(review);

// A revision after the reviewed snapshot cannot inherit the attribution.
export function isMedicallyReviewedRevision(revisionDate: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(revisionDate)) return false;
  const date = new Date(`${revisionDate}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === revisionDate
    && revisionDate <= medicalReview.reviewedOn;
}