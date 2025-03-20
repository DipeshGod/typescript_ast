import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { deviceGroupCreateSchema } from "./schema";
import { SupportedVersion } from "@src/supported-versions";

const router = Router();

function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request body",
          details: error.errors,
        });
      }
      return res.status(400).json({ error: "Invalid request body" });
    }
  };
}

function getSchemaForVersion(version: SupportedVersion) {
  switch (version) {
    case "7.7.0":
      return deviceGroupCreateSchema;
    case "7.8.0":
      return deviceGroupCreateSchema;
    case "7.9.0":
      return deviceGroupCreateSchema;
    default:
      throw new Error("Unsupported version");
  }
}

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const version = "7.8.0" as SupportedVersion;
  const schema = getSchemaForVersion(version);
  validate(schema)(req, res, next);
  res.status(200).json({ data: req.body });
});

export { router as deviceGroupRouter };
