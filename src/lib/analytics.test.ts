import { describe, expect, it } from "bun:test";
import { GA_HOST_PATTERN, GA_MEASUREMENT_ID } from "./analytics";

describe("GA4 host check", () => {
  it("accepts t1d-ar.com", () => expect(GA_HOST_PATTERN.test("t1d-ar.com")).toBe(true));
  it("accepts www.t1d-ar.com", () => expect(GA_HOST_PATTERN.test("www.t1d-ar.com")).toBe(true));
  it("rejects the preview domain", () =>
    expect(GA_HOST_PATTERN.test("id-preview--85f93b82-2e2b-4038-9d71-5756df17852e.lovable.app")).toBe(false));
  it("keeps the measurement ID", () => expect(GA_MEASUREMENT_ID).toBe("G-35NPPR99PF"));
});
