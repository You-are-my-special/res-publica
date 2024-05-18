import { z } from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
  title: z.string().optional(),
  topic: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const getIssuesSchema = searchParamsSchema;
export type GetIssuesSchema = z.infer<typeof getIssuesSchema>;
