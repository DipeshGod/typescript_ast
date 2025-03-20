import { z } from "zod";

export const SupportedVersion = z.union([
  z.literal("7.6.0"),
  z.literal("7.7.0"),
  z.literal("7.8.0"),
]);

export type SupportedVersion = z.infer<typeof SupportedVersion>;
