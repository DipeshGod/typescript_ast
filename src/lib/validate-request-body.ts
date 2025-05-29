import z from "zod/v4";

export const validateRequestBody = async (schema: z.ZodType, body: any) => {
  return await schema.parseAsync(body);
};
