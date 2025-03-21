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
    // Create a dynamic transformation by removing unwanted fields and adding new fields

    // Transform `name` into `deviceName`
    const deviceName = `${data.name} trasnformed`;

    // Construct the transformed object dynamically
    const transformedData: Partial<typeof data> & {
      [key: string]: any;
    } = {
      deviceName,
      description: data.description,
      devices: data.devices,
    };

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
