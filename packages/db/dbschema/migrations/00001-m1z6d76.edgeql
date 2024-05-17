CREATE MIGRATION m1z6d76b2yemwtit4oy7mc4v2q6yfcjlcqgs2auh5tt7bwn6i73r2q
    ONTO initial
{
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Account {
      CREATE REQUIRED PROPERTY provider: std::str;
      CREATE REQUIRED PROPERTY providerAccountId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE CONSTRAINT std::exclusive ON ((.provider, .providerAccountId));
      CREATE PROPERTY access_token: std::str;
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY expires_at: std::int64;
      CREATE PROPERTY id_token: std::str;
      CREATE PROPERTY refresh_token: std::str;
      CREATE PROPERTY scope: std::str;
      CREATE PROPERTY session_state: std::str;
      CREATE PROPERTY token_type: std::str;
      CREATE REQUIRED PROPERTY type: std::str;
  };
  CREATE TYPE default::User {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY emailVerified: std::datetime;
      CREATE PROPERTY image: std::str;
      CREATE PROPERTY name: std::str;
  };
  ALTER TYPE default::Account {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK accounts := (.<user[IS default::Account]);
  };
  CREATE TYPE default::GitHubUser {
      CREATE PROPERTY avatar_url: std::str;
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY html_url: std::str;
      CREATE PROPERTY login: std::str;
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Gravitas {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY score: std::float64;
  };
  CREATE TYPE default::Label {
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY repoId: std::int64;
      CREATE CONSTRAINT std::exclusive ON ((.name, .repoId));
      CREATE PROPERTY color: std::str;
      CREATE PROPERTY default: std::bool;
      CREATE PROPERTY description: std::str;
  };
  CREATE TYPE default::Reaction {
      CREATE PROPERTY confused: std::int64;
      CREATE PROPERTY eyes: std::int64;
      CREATE PROPERTY heart: std::int64;
      CREATE PROPERTY hooray: std::int64;
      CREATE PROPERTY laugh: std::int64;
      CREATE PROPERTY minusOne: std::int64;
      CREATE PROPERTY plusOne: std::int64;
      CREATE PROPERTY rocket: std::int64;
      CREATE PROPERTY total_count: std::int64;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Issue {
      CREATE LINK user: default::GitHubUser;
      CREATE MULTI LINK gravitas_scores: default::Gravitas;
      CREATE LINK gravitas := (SELECT
          .gravitas_scores ORDER BY
              .createdAt ASC
      LIMIT
          1
      );
      CREATE MULTI LINK labels: default::Label;
      CREATE LINK reactions: default::Reaction;
      CREATE PROPERTY active_lock_reason: std::str;
      CREATE PROPERTY assignee: std::str;
      CREATE PROPERTY author_association: std::str;
      CREATE PROPERTY body: std::str;
      CREATE PROPERTY closed_at: std::datetime;
      CREATE PROPERTY comments: std::int64;
      CREATE PROPERTY created_at: std::datetime;
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY html_url: std::str;
      CREATE PROPERTY locked: std::bool;
      CREATE PROPERTY milestone: std::str;
      CREATE PROPERTY number: std::int64;
      CREATE PROPERTY performed_via_github_app: std::str;
      CREATE PROPERTY repository_url: std::str;
      CREATE PROPERTY state: std::str;
      CREATE PROPERTY state_reason: std::str;
      CREATE PROPERTY timeline_url: std::str;
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY updated_at: std::datetime;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Language {
      CREATE PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Owner {
      CREATE PROPERTY avatar_url: std::str;
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY html_url: std::str;
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Topic {
      CREATE PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.name);
  };
  CREATE TYPE default::Repo {
      CREATE MULTI LINK languages: default::Language;
      CREATE REQUIRED LINK owner: default::Owner;
      CREATE MULTI LINK topics: default::Topic;
      CREATE PROPERTY createdAt: std::datetime;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY forksCount: std::int64;
      CREATE PROPERTY fullName: std::str;
      CREATE PROPERTY githubId: std::int64 {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY hasIssues: std::bool;
      CREATE PROPERTY homepage: std::str;
      CREATE PROPERTY issueCommentUrl: std::str;
      CREATE PROPERTY issuesUrl: std::str;
      CREATE PROPERTY language: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY openIssuesCount: std::int64;
      CREATE PROPERTY pushedAt: std::datetime;
      CREATE PROPERTY stargazersCount: std::int64;
      CREATE PROPERTY subscribersCount: std::int64;
      CREATE PROPERTY updatedAt: std::datetime;
      CREATE PROPERTY url: std::str;
      CREATE PROPERTY visibility: std::str;
      CREATE PROPERTY watchersCount: std::int64;
  };
  ALTER TYPE default::Issue {
      CREATE REQUIRED LINK repo: default::Repo;
  };
  ALTER TYPE default::Repo {
      CREATE MULTI LINK issues := (.<repo[IS default::Issue]);
  };
  CREATE TYPE default::Session {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY expires: std::datetime;
      CREATE REQUIRED PROPERTY sessionToken: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK sessions := (.<user[IS default::Session]);
  };
  CREATE TYPE default::VerificationToken {
      CREATE REQUIRED PROPERTY identifier: std::str;
      CREATE REQUIRED PROPERTY token: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE CONSTRAINT std::exclusive ON ((.identifier, .token));
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY expires: std::datetime;
  };
};
