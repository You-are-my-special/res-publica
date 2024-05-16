import "server-only";

import { client, e } from "@acme/db";

import { type GetTasksSchema } from "./validations";

//THIS would be moved to the api later
export async function getTasks(input: GetTasksSchema) {
  const { page, per_page, sort, title, topic, priority, operator, from, to } =
    input;

  const [column, order] = (sort?.split(".").filter(Boolean) ?? [
    "createdAt",
    "desc",
  ]) as [keyof any | undefined, "asc" | "desc" | undefined];
  //here we [keyof Task | undefined, "asc" | "des
  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page;

    // Column and order to sort by
    // Spliting the sort string by "." to get the column and order
    // Example: "title.desc" => ["title", "desc"]
    // const [column, order] = (sort?.split(".").filter(Boolean) ?? [
    //   "createdAt",
    //   "desc",
    // ]) as [keyof Task | undefined, "asc" | "desc" | undefined];

    // Convert the date strings to Date objects
    // const fromDay = from ? new Date(from) : undefined;
    // const toDay = to ? new Date(to) : undefined;

    // const where: DrizzleWhere<Task> =
    //   !operator || operator === "and"
    //     ? and(
    //         // Filter tasks by title
    //         title
    //           ? filterColumn({
    //               column: tasks.title,
    //               value: title,
    //             })
    //           : undefined,
    //         // Filter tasks by status
    //         !!status
    //           ? filterColumn({
    //               column: tasks.status,
    //               value: status,
    //               isSelectable: true,
    //             })
    //           : undefined,
    //         // Filter tasks by priority
    //         !!priority
    //           ? filterColumn({
    //               column: tasks.priority,
    //               value: priority,
    //               isSelectable: true,
    //             })
    //           : undefined,
    //         // Filter by createdAt
    //         fromDay && toDay
    //           ? and(gte(tasks.createdAt, fromDay), lte(tasks.createdAt, toDay))
    //           : undefined,
    //       )
    //     : or(
    //         // Filter tasks by title
    //         title
    //           ? filterColumn({
    //               column: tasks.title,
    //               value: title,
    //             })
    //           : undefined,
    //         // Filter tasks by status
    //         !!status
    //           ? filterColumn({
    //               column: tasks.status,
    //               value: status,
    //               isSelectable: true,
    //             })
    //           : undefined,
    //         // Filter tasks by priority
    //         !!priority
    //           ? filterColumn({
    //               column: tasks.priority,
    //               value: priority,
    //               isSelectable: true,
    //             })
    //           : undefined,
    //         // Filter by createdAt
    //         fromDay && toDay
    //           ? and(gte(tasks.createdAt, fromDay), lte(tasks.createdAt, toDay))
    //           : undefined,
    //       );

    const topics = topic?.split(".") ?? [];

    const makeTopicFilter = (topics: string[]) =>
      e.shape(e.Issue, (issue) => {
        const repo = issue["<issues[is GitHubRepo]"];
        const topicsSet = e.set(...topics.map((topic) => e.str(topic)));
        return {
          filter: e.op(
            e.count(e.op(topicsSet, "intersect", repo.topics.name)),
            ">",
            0,
          ),
        };
      });

    const issues = e.select(e.Issue, (issue) => {
      const ops = [];

      if (title) ops.push(e.op(issue.title, "ilike", `%${title}%`));
      if (topics.length > 0) {
        const topicFilter = makeTopicFilter(topics)(issue).filter;

        ops.push(topicFilter);
      }

      const repo = issue["<issues[is GitHubRepo]"];

      const columns = {
        reactions_total_count: issue.reactions.total_count,
        gravitas_score: issue.gravitas.score,
      };
      const expression = columns[column] ?? issue.created_at;

      return {
        id: true,
        title: true,
        labels: true,
        reactions: {
          total_count: true,
        },
        created_at: true,
        gravitas_scores: true,
        gravitas: {
          score: true,
        },
        repo: e.select(repo, () => ({
          id: true,
          name: true,
          stargazersCount: true,
          topics: {
            name: true,
          },
          owner: {
            name: true,
            avatar_url: true,
            html_url: true,
          },
        })),
        filter: ops.length ? e.all(e.set(...ops)) : e.bool(true),
        order_by: {
          expression,
          direction: order === "asc" ? "ASC" : "DESC",
          empty: "EMPTY FIRST",
        },
        limit: per_page,
        offset,
      };
    });
    const totalQuery = e.select({
      total: e.count(
        e.select(e.Issue, (issue) => {
          const ops = [];
          if (title) ops.push(e.op(issue.title, "ilike", `%${title}%`));
          if (topics.length > 0) {
            const topicFilter = makeTopicFilter(topics)(issue).filter;
            ops.push(topicFilter);
          }

          return {
            filter: ops.length ? e.all(e.set(...ops)) : e.bool(true),
          };
        }),
      ),
    });

    const { total } = await totalQuery.run(client);
    const result = await issues.run(client);
    const pageCount = Math.ceil(total / per_page);

    return { data: result, pageCount };
  } catch (err) {
    return { data: [], pageCount: 0 };
  }
}
export type Issue = Awaited<ReturnType<typeof getTasks>>["data"][number];
// export async function getTaskCountByStatus() {
//   noStore();
//   try {
//     return await e
//       .select({
//         status: tasks.status,
//         count: count(),
//       })
//       .from(tasks)
//       .groupBy(tasks.status)
//       .execute();
//   } catch (err) {
//     return [];
//   }
// }

// export async function getTaskCountByPriority() {
//   noStore();
//   try {
//     return await e
//       .select({
//         priority: tasks.priority,
//         count: count(),
//       })
//       .from(tasks)
//       .groupBy(tasks.priority)
//       .execute();
//   } catch (err) {
//     return [];
//   }
// }
