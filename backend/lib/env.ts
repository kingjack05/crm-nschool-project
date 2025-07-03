import * as z from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z
      .string()
      .transform(Number)
      .pipe(z.number().int().positive())
      .default("3000"),
  })
  .parse(process.env);
