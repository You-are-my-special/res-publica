CREATE MIGRATION m16xytgb2pzmi5ptdlpdk3woyq4xkxfgdfuewh2r32sarg3syo6u5q
    ONTO m1tj24zeozpnhbp7qxxqv5zgvvfpmc2odgqyng3ry4snkl6uvjwrtq
{
  CREATE TYPE default::RepoRequest {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE INDEX ON (.createdAt);
      CREATE LINK user: default::User;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY owner: std::str;
  };
  CREATE TYPE default::Vote {
      CREATE LINK repo_request: default::RepoRequest;
      CREATE LINK user: default::User;
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::RepoRequest {
      CREATE MULTI LINK votes := (.<repo_request[IS default::Vote]);
  };
  CREATE TYPE default::SenatePresence {
      CREATE REQUIRED PROPERTY updatedAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE INDEX ON (.updatedAt);
      CREATE REQUIRED LINK user: default::User {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK votes := (.<user[IS default::Vote]);
  };
};
