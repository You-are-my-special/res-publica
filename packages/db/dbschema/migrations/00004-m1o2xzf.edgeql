CREATE MIGRATION m1o2xzfcs65g73b3wx23gdvusi6ap5ynp5l6a5ezxxf5zlr4plfd6a
    ONTO m16xytgb2pzmi5ptdlpdk3woyq4xkxfgdfuewh2r32sarg3syo6u5q
{
  ALTER TYPE default::Issue {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON ((((.title ++ ' ') ++ .body))[0:8191]);
  };
  ALTER TYPE default::Issue {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON ((.title)[0:8191]);
  };
};
