import review from "../../public/medical-review.json";

export const medicalReview = Object.freeze(review);

// Only an explicit declaration of the reviewed snapshot permits attribution.
export function isMedicallyReviewedRevision(revisionDate?: string): boolean {
  return revisionDate === medicalReview.reviewedOn;
}