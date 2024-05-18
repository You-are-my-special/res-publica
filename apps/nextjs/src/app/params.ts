// searchParams.ts
import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const issuesParsers = {
  page: parseAsInteger.withDefault(1),
  per_page: parseAsInteger.withDefault(10),
  sort: parseAsString,
  title: parseAsString,
  topic: parseAsString,
  from: parseAsString,
  to: parseAsString,
};

export const issuesParamsCache = createSearchParamsCache(issuesParsers);
