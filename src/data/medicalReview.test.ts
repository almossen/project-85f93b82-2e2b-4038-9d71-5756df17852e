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
  test("missing snapshot declarations cannot inherit attribution", () => {
    assert.equal(isMedicallyReviewedRevision(), false);
    assert.equal(isMedicallyReviewedRevision(""), false);
  });
  test("only the explicitly reviewed snapshot qualifies", () => {
    assert.equal(isMedicallyReviewedRevision("2026-10-23"), false);
    assert.equal(isMedicallyReviewedRevision("2026-02-30"), false);
  });
  test("both reviewers are listed and only the comprehensive review is dated", () => {
    assert.deepEqual(medicalReview.reviewers.map((r) => r.name), ["د. محسن المغربي", "د. أحمد حمدي كحيل"]);
    assert.equal(medicalReview.reviewers.some((r) => "reviewedOn" in r), false);
  });
});
