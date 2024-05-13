CREATE MIGRATION m1sslwnvuwbtvztoch5caadhpmjgpeolzahvi4lwdkjvulyx26e5bq
    ONTO m1vo6t2ngq2nsvfbqkjkrpejytgpcjp4txclq5xojusbewh3y2pvra
{
  ALTER TYPE default::Issue {
      CREATE LINK repo: default::GitHubRepo;
  };
};
