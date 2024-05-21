import { nullable, z } from "zod";

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort_dir: z.enum(["asc", "desc"]).nullable(),
  sort_col: z.string().nullable(),
  title: z.string().optional().nullable(),
  topic: z.array(z.string()),
  repo: z.array(z.string()),
  from: z.string().optional().nullable(),
  to: z.string().optional().nullable(),
});

export const getIssuesSchema = searchParamsSchema;
export type GetIssuesSchema = z.infer<typeof getIssuesSchema>;

export const repoSearchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort_dir: z.enum(["asc", "desc"]).nullable(),
  sort_col: z.string().nullable(),
  name: z.string().optional().nullable(),
  topic: z.array(z.string()),
  from: z.string().optional().nullable(),
  to: z.string().optional().nullable(),
});

export const getTasksSchema = searchParamsSchema;
export type GetTasksSchema = z.infer<typeof getTasksSchema>;
