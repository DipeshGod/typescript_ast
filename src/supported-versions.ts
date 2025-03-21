export const LATEST = "7.9.0" as const;
export const BACKWARD1 = "7.8.0" as const;
export const BACKWARD2 = "7.7.0" as const;

export type SupportedVersion =
  | typeof BACKWARD2
  | typeof BACKWARD1
  | typeof LATEST;
