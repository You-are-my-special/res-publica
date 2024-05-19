CREATE MIGRATION m15bihiwb7gg7nea3rnitfr45iuklvignjj6c4x2eepmmirzbimn6q
    ONTO m1wmdmkkhk5vl7elkpxhh2kdx2uvivdrnechjuulrktpy4jf2rg3la
{
  ALTER TYPE default::Issue {
      DROP INDEX ext::pg_trgm::gin ON (.title);
  };
  ALTER TYPE default::Issue {
      CREATE INDEX ext::pg_trgm::gist ON (.title);
  };
};
