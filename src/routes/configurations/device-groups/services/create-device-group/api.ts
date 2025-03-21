import { NextFunction, Request, Response } from "express";
import { SupportedVersion } from "@src/supported-versions";
import { z } from "zod";
import { validateRequestBody } from "@src/lib/validate-request-body";

const changes = {
  all: [
    {
      type: "rename",
      field: "name",
      to: "deviceName",
    },
  ],
};

const create = z
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
    const transformedData: Record<string, any> = {};

    // Copy all fields first
    Object.keys(data).forEach((key) => {
      transformedData[key] = data[key as keyof typeof data];
    });

    // Apply each change from the changes.all array
    for (const change of changes.all) {
      if (change.type === "rename" && change.field in data) {
        // Get the original value
        const value = transformedData[change.field];

        // Set value under new field name
        transformedData[change.to] = value;

        // Remove the original field
        delete transformedData[change.field];
      }
      // Add cases for other change types here as needed
    }

    return transformedData;
  });

export const createDeviceGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const version = "7.8.0" as SupportedVersion;

  const payload = await (await validateRequestBody(create))(req, res, next);

  res.status(200).json({ data: payload });
};
