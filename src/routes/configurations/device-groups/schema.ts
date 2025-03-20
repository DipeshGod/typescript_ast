import { z } from "zod";

export const deviceGroupCreateSchema = z.object({
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

export const deviceGroupCreateResponseSchema = z.object({
  status: z.literal("Success"),
  message: z.string().startsWith("/monitorapi/"),
});

export type DeviceGroupCreateRequest = z.infer<typeof deviceGroupCreateSchema>;
export type DeviceGroupCreateResponse = z.infer<
  typeof deviceGroupCreateResponseSchema
>;
