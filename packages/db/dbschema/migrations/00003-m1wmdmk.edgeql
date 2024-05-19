CREATE MIGRATION m1wmdmkkhk5vl7elkpxhh2kdx2uvivdrnechjuulrktpy4jf2rg3la
    ONTO m1zurfkl2arazwzpbreao447tweqx3g6esbgvgyf5mixfflalhxpaq
{
  ALTER TYPE default::Gravitas {
      CREATE INDEX ON (.createdAt);
  };
  ALTER TYPE default::Issue {
      CREATE INDEX ext::pg_trgm::gin ON (.title);
  };
  ALTER TYPE default::Reaction {
      CREATE INDEX ON (.total_count);
  };
  ALTER TYPE default::Repo {
      CREATE INDEX ON (.stargazersCount);
  };
};
