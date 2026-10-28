import { describe, it as test } from "node:test";
import { strict as assert } from "node:assert";
import { GA_HOST_PATTERN, GA_MEASUREMENT_ID } from "./analytics";

describe("GA4 host check", () => {
  test("accepts t1d-ar.com", () => assert.equal(GA_HOST_PATTERN.test("t1d-ar.com"), true));
  test("accepts www.t1d-ar.com", () => assert.equal(GA_HOST_PATTERN.test("www.t1d-ar.com"), true));
  test("rejects the preview domain", () =>
    assert.equal(
      GA_HOST_PATTERN.test("id-preview--85f93b82-2e2b-4038-9d71-5756df17852e.lovable.app"),
      false,
    ));
  test("keeps the measurement ID", () => assert.equal(GA_MEASUREMENT_ID, "G-35NPPR99PF"));
});
