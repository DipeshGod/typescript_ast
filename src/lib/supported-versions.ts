import { supportedVersions } from "@src/constants/supported-versions";

export function hasSupportedMinorOrExactVersion(
  version: string,
  versions: Record<string, string>
): boolean {
  const getMajorMinor = (v: string) => v.split(".").slice(0, 2).join(".");
  const inputMajorMinor = getMajorMinor(version);

  return Object.values(versions).some((supportedVersion) => {
    const supportedMajorMinor = getMajorMinor(supportedVersion);
    return supportedMajorMinor === inputMajorMinor;
  });
}

export function isUnsupportedVersion(
  version: string,
  versions = supportedVersions
): boolean {
  return !hasSupportedMinorOrExactVersion(version, versions);
}
