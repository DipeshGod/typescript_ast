import z from "zod";

export const validateRequestBody = async (schema: z.ZodType, body: any) => {
  return await schema.parseAsync(body);
};
