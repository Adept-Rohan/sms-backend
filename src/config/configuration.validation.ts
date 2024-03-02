import { z } from 'zod';

const dbSchema = z.object({
  client: z.string().default('mysql'),
  connection: z.object({
    host: z.string().default('localhost'),
    port: z.number().default(3306),
    database: z.string(),
    user: z.string(),
    password: z.string(),
  }),
});

export const configSchema = z.object({
  database: dbSchema,
  jwt: z.object({
    jwtSecret: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;
