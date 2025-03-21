import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequestBody = async (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await schema.parseAsync(req.body);
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
