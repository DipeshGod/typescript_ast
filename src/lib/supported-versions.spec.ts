import { describe, it, expect } from "vitest";
import {
  hasSupportedMinorOrExactVersion,
  isUnsupportedVersion,
} from "./supported-versions";

const mockSupportedVersions = {
  SEVEN_NINE_ZERO: "7.9.0",
  SEVEN_EIGHT_ZERO: "7.8.0",
  SEVEN_SEVEN_ZERO: "7.7.0",
};

describe("hasSupportedMinorOrExactVersion (with mock)", () => {
  it("should return true for exact supported versions", () => {
    expect(
      hasSupportedMinorOrExactVersion("7.9.0", mockSupportedVersions)
    ).toBe(true);
    expect(
      hasSupportedMinorOrExactVersion("7.8.0", mockSupportedVersions)
    ).toBe(true);
  });

  it("should return true for minor versions of supported major.minor", () => {
    expect(
      hasSupportedMinorOrExactVersion("7.9.1", mockSupportedVersions)
    ).toBe(true);
    expect(
      hasSupportedMinorOrExactVersion("7.8.3", mockSupportedVersions)
    ).toBe(true);
    expect(
      hasSupportedMinorOrExactVersion("7.7.2", mockSupportedVersions)
    ).toBe(true);
  });

  it("should return false for unsupported major.minor versions", () => {
    expect(
      hasSupportedMinorOrExactVersion("7.6.0", mockSupportedVersions)
    ).toBe(false);
    expect(
      hasSupportedMinorOrExactVersion("6.9.0", mockSupportedVersions)
    ).toBe(false);
    expect(
      hasSupportedMinorOrExactVersion("8.0.0", mockSupportedVersions)
    ).toBe(false);
  });

  it("should handle versions with multiple digits", () => {
    expect(
      hasSupportedMinorOrExactVersion("7.9.10", mockSupportedVersions)
    ).toBe(true);
    expect(
      hasSupportedMinorOrExactVersion("7.8.11", mockSupportedVersions)
    ).toBe(true);
    expect(
      hasSupportedMinorOrExactVersion("7.7.100", mockSupportedVersions)
    ).toBe(true);
  });
});

describe("isUnsupportedVersion (with mocked supportedVersions)", () => {
  it("returns false for exact supported versions", () => {
    expect(isUnsupportedVersion("7.9.0", mockSupportedVersions)).toBe(false);
    expect(isUnsupportedVersion("7.8.0", mockSupportedVersions)).toBe(false);
  });

  it("returns false for minor versions of supported major.minor", () => {
    expect(isUnsupportedVersion("7.9.3", mockSupportedVersions)).toBe(false);
    expect(isUnsupportedVersion("7.8.1", mockSupportedVersions)).toBe(false);
  });

  it("returns true for unsupported major.minor versions", () => {
    expect(isUnsupportedVersion("8.0.0", mockSupportedVersions)).toBe(true);
    expect(isUnsupportedVersion("6.9.0", mockSupportedVersions)).toBe(true);
  });
});
