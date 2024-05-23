// searchParams.ts
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs/server";

export const issuesParsers = {
  page: parseAsInteger.withDefault(1),
  per_page: parseAsInteger.withDefault(10),
  sort_col: parseAsString,
  sort_dir: parseAsStringEnum(["asc", "desc"]).withDefault("asc"),
  title: parseAsString,
  topic: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
    clearOnDefault: true,
  }),
  repo: parseAsArrayOf(parseAsString).withDefault([]).withOptions({
    clearOnDefault: true,
  }),
  from: parseAsString,
  to: parseAsString,
};

export const reposParsers = {
  page: parseAsInteger.withDefault(1),
  per_page: parseAsInteger.withDefault(10),
  sort_col: parseAsString,
  sort_dir: parseAsStringEnum(["asc", "desc"]).withDefault("asc"),
  name: parseAsString,
  topic: parseAsArrayOf(parseAsString).withDefault([]),
  from: parseAsString,
  to: parseAsString,
};

export const issuesParamsCache = createSearchParamsCache(issuesParsers);
export const reposParamsCache = createSearchParamsCache(reposParsers);
