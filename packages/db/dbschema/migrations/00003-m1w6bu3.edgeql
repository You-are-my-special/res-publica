CREATE MIGRATION m1w6bu3tgkvof7uc3gt4crozqrnyrylnb6jqkcto4xrg4qbxcf3mza
    ONTO m1j7vjjwx7fumvyzwccxowcsqfgamzhpav6q37mpzobm6cgswh6fla
{
  ALTER TYPE default::Issue {
      ALTER PROPERTY repositoryUrl {
          RENAME TO html_url;
      };
  };
  ALTER TYPE default::Issue {
      CREATE PROPERTY repository_url: std::str;
  };
};
