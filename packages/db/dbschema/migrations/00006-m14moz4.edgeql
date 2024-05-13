CREATE MIGRATION m14moz4gg32qcbddaja7zuwljf7a5dbie423tyszssd4qu6z2i46va
    ONTO m1sslwnvuwbtvztoch5caadhpmjgpeolzahvi4lwdkjvulyx26e5bq
{
  ALTER TYPE default::Issue {
      DROP LINK repo;
  };
};
