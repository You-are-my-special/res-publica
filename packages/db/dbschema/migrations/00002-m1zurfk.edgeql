CREATE MIGRATION m1zurfkl2arazwzpbreao447tweqx3g6esbgvgyf5mixfflalhxpaq
    ONTO m1z6d76b2yemwtit4oy7mc4v2q6yfcjlcqgs2auh5tt7bwn6i73r2q
{
  CREATE EXTENSION pgvector VERSION '0.5';
  CREATE EXTENSION pg_trgm VERSION '1.6';
  CREATE EXTENSION ai VERSION '1.0';
  ALTER TYPE default::Issue {
      CREATE DEFERRED INDEX ext::ai::index(embedding_model := 'text-embedding-3-small') ON (.body);
      ALTER LINK gravitas_scores {
          ON TARGET DELETE ALLOW;
      };
  };
};
