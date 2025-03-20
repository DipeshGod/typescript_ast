import { z } from "zod";

export const create1 = z.object({
  description: z
    .string()
    .min(1)
    .describe("Description for the device group. Mandatory field."),
  devices: z
    .array(z.string())
    .optional()
    .describe(
      "List of device ID(s) to associate with the device group. Optional field."
    ),
  name: z
    .string()
    .min(1)
    .describe(
      "A unique valid string to define the Name of the device group. Mandatory field."
    ),
});

export const createResponseSchema = z.object({
  status: z.literal("Success"),
  message: z.string().startsWith("/monitorapi/"),
});

export type create1Request = z.infer<typeof create1>;
export type createResponse = z.infer<typeof createResponseSchema>;
