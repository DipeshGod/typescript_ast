import { Request, Response } from "express";
import {
  BACKWARD1,
  BACKWARD2,
  LATEST,
  SupportedVersion,
} from "@src/supported-versions";
import { z } from "zod/v4";
import { validateRequestBody } from "@src/lib/validate-request-body";

const createDeviceGroupSchema = z
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
      )
      .meta({
        [LATEST]: true,
        [BACKWARD1]: false,
        [BACKWARD2]: false,
      }),
    name: z
      .string()
      .min(1)
      .describe(
        "A unique valid string to define the Name of the device group. Mandatory field."
      ),
  })
  .meta({
    description: "API End Point To Create User Group",
  });

const coherentSchema = (
  schema: typeof createDeviceGroupSchema,
  version: string
) => {
  return schema.transform((data) => {
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
};

export const createDeviceGroup = async (req: Request, res: Response) => {
  const version = "7.8.0" as SupportedVersion;

  try {
    const schema = coherentSchema(createDeviceGroupSchema, version);
    const payload = await validateRequestBody(schema, req.body);
    res.status(200).json({ data: payload });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Invalid request body",
        details: error,
      });
      return;
    }
    res.status(400).json({ error: "Invalid request body" });
  }
};

export const getCreateDeviceGroupJsonSchema = async (
  req: Request,
  res: Response
) => {
  try {
    const jsonSchema = z.toJSONSchema(createDeviceGroupSchema);
    res.status(200).json({ jsonSchema });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
