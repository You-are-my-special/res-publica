CREATE MIGRATION m17ztbrq7eud2gukbksbixvldfed6rbajbuql2exfqsv7x5dhx56fq
    ONTO m1o2xzfcs65g73b3wx23gdvusi6ap5ynp5l6a5ezxxf5zlr4plfd6a
{
  ALTER TYPE default::Issue {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON ((.title)[0:8191]);
  };
  ALTER TYPE default::Issue {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.title);
  };
  ALTER TYPE default::RepoRequest {
      CREATE PROPERTY image: std::str;
  };
};
