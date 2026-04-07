import { describe, it, expect } from "vitest";
import { cn, formatPrice, calcNights, slugify } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("deduplicates tailwind classes", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });
});

describe("formatPrice", () => {
  it("formats whole dollar amounts", () => {
    expect(formatPrice(250)).toBe("$250");
  });
});

describe("calcNights", () => {
  it("calculates nights between dates", () => {
    expect(calcNights("2025-06-01", "2025-06-04")).toBe(3);
  });
});

describe("slugify", () => {
  it("lowercases and replaces spaces", () => {
    expect(slugify("Blvck Cabin I")).toBe("blvck-cabin-i");
  });

  it("strips special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });
});
