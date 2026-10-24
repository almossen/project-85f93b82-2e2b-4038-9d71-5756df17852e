import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { isMedicallyReviewedRevision, medicalReview } from "./medicalReview";

describe("medical review snapshot", () => {
  test("the comprehensive review is dated 24 October 2026", () => {
    assert.equal(medicalReview.reviewedOn, "2026-10-24");
    assert.equal(isMedicallyReviewedRevision("2026-10-24"), true);
  });
  test("later revisions cannot inherit the doctor's attribution", () => {
    assert.equal(isMedicallyReviewedRevision("2026-10-25"), false);
    assert.equal(isMedicallyReviewedRevision("2027-01-01"), false);
  });
});