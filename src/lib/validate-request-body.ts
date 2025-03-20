import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequestBody = (schema: z.ZodType) => {
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
};
