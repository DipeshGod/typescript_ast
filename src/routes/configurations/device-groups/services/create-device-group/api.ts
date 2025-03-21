import { NextFunction, Request, Response } from "express";
import {
  BACKWARD1,
  BACKWARD2,
  LATEST,
  SupportedVersion,
} from "@src/supported-versions";
import { z } from "zod";
import { validateRequestBody } from "@src/lib/validate-request-body";

const create1 = z.object({
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

function getSchemaForVersion(version: SupportedVersion) {
  switch (version) {
    case BACKWARD2:
      return create1;
    case BACKWARD1:
      return create1;
    case LATEST:
      return create1;
    default:
      throw new Error("Unsupported version");
  }
}

export const createDeviceGroup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const version = "7.8.0" as SupportedVersion;
  const schema = getSchemaForVersion(version);
  validateRequestBody(schema)(req, res, next);
  res.status(200).json({ data: req.body });
};
