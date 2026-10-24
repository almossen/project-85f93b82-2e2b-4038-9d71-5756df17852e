import { describe, expect, test } from "bun:test";
import { isMedicallyReviewedRevision, medicalReview } from "./medicalReview";

describe("medical review snapshot", () => {
  test("the comprehensive review is dated 24 October 2026", () => {
    expect(medicalReview.reviewedOn).toBe("2026-10-24");
    expect(isMedicallyReviewedRevision("2026-10-24")).toBe(true);
  });
  test("later revisions cannot inherit the doctor's attribution", () => {
    expect(isMedicallyReviewedRevision("2026-10-25")).toBe(false);
    expect(isMedicallyReviewedRevision("2027-01-01")).toBe(false);
  });
});