CREATE MIGRATION m1szihmwjkxjtnagp6y4f3sqnrwprk5nldxthzlk7tmrzjig5pkccq
    ONTO m1crmmsfzhs2tk4gnneye4lksz5psubbyrknb363yfzqiktpgioebq
{
  CREATE TYPE default::Language {
      CREATE PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::GitHubRepo {
      CREATE MULTI LINK languages: default::Language;
  };
  ALTER TYPE default::GitHubRepo {
      DROP PROPERTY topics;
  };
  CREATE TYPE default::Topic {
      CREATE PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.name);
  };
  ALTER TYPE default::GitHubRepo {
      CREATE MULTI LINK topics: default::Topic;
  };
  ALTER TYPE default::GitHubUser {
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Issue {
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Owner {
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
