CREATE MIGRATION m1sbdi7yibfvc3f22cmpxyc2s5ve6567a5emy3hsovqzzazgimnxzq
    ONTO m1xbejohtspgkxgnz5urdn3e37bik6fkxvwkf6x2xzdp5u6xz4lyiq
{
  ALTER TYPE default::Issue {
      DROP INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON ((.body)[0:8191]);
  };
  ALTER TYPE default::Issue {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON ((((.title ++ ' ') ++ .body))[0:8191]);
  };
};
