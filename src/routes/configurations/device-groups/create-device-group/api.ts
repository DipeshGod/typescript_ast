import { Request, Response } from "express";
import { LATEST, SupportedVersion } from "@src/supported-versions";
import { z } from "zod";
import { validateRequestBody } from "@src/lib/validate-request-body";

const create = (version: string) =>
  z
    .object({
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
    })
    .transform((data) => {
      // schema should accomodate latest version first
      if (version === LATEST) {
        return data;
      }

      if (version === "7.8.0") {
        return {
          ...data,
          devices: data.devices || [],
        };
      }

      if (version === "7.7.0") {
        return {
          ...data,
          devices: data.devices || [],
        };
      }

      return data;
    });

const validate = async (version: string, body: any) => {
  const schema = create(version);
  const data = await validateRequestBody(schema, body);
  return data;
};

export const createDeviceGroup = async (req: Request, res: Response) => {
  const version = "7.8.0" as SupportedVersion;

  try {
    const payload = await validate(version, req.body);
    res.status(200).json({ data: payload });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Invalid request body",
        details: error.errors,
      });
      return;
    }
    res.status(400).json({ error: "Invalid request body" });
  }
};
