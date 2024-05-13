CREATE MIGRATION m1nukhndic4gh33ovgl4fscne6yzjorpt5lvuxmtlikahmtlcxxtaq
    ONTO m14moz4gg32qcbddaja7zuwljf7a5dbie423tyszssd4qu6z2i46va
{
  ALTER TYPE default::GitHubRepo {
      ALTER LINK issues {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
