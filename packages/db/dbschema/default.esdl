module default {
  type User {
    property name -> str;
    required property email -> str {
      constraint exclusive;
    }
    property emailVerified -> datetime;
    property image -> str;
    multi link accounts := .<user[is Account];
    multi link sessions := .<user[is Session];
    property createdAt -> datetime {
      default := datetime_current();
    };
  }

  type Account {
    required property userId := .user.id;
    required property type -> str;
    required property provider -> str;
    required property providerAccountId -> str {
    constraint exclusive;
    };
    property refresh_token -> str;
    property access_token -> str;
    property expires_at -> int64;
    property token_type -> str;
    property scope -> str;
    property id_token -> str;
    property session_state -> str;
    required link user -> User {
      on target delete delete source;
    };
    property createdAt -> datetime {
      default := datetime_current();
    };

    constraint exclusive on ((.provider, .providerAccountId))
  }

  type Session {
      required property sessionToken -> str {
          constraint exclusive;
      }
      required property userId := .user.id;
      required property expires -> datetime;
      required link user -> User {
          on target delete delete source;
      };
      property createdAt -> datetime {
          default := datetime_current();
      };
  }

  type VerificationToken {
      required property identifier -> str;
      required property token -> str {
          constraint exclusive;
      }
      required property expires -> datetime;
      property createdAt -> datetime {
          default := datetime_current();
      };

      constraint exclusive on ((.identifier, .token))
  }

  type Issue {
    property url -> str;
    property html_url -> str;
    property repository_url -> str;
    property number -> int64;
    property title -> str;
    link user -> GitHubUser;
    multi link labels -> Label;
    property state -> str;
    property locked -> bool;
    property assignee -> str;
    property milestone -> str;
    property comments -> int64;
    property created_at -> datetime;
    property updated_at -> datetime;
    property closed_at -> datetime;
    property author_association -> str;
    property active_lock_reason -> str;
    property body -> str;
    link reactions -> Reaction;
    property timeline_url -> str;
    property performed_via_github_app -> str;
    property state_reason -> str;
  }  
  
  type GitHubUser {
    property login -> str;
    property avatar_url -> str;
    property html_url -> str;
    property name -> str;
  }

  type Label {
    property name -> str;
    property color -> str;
    property default -> bool;
    property description -> str;
  }

  type Reaction {
    property url -> str;
    property total_count -> int64;
    property laugh -> int64;
    property hooray -> int64;
    property confused -> int64;
    property heart -> int64;
    property rocket -> int64;
    property plusOne -> int64;
    property minusOne -> int64;
    property eyes -> int64;
  }

  type GitHubRepo {
    property url -> str;
    property name -> str;
    property fullName -> str;
    property owner -> str;
    property ownerUrl -> str;
    property issueCommentUrl -> str;
    property issuesUrl -> str;
    property homepage -> str;
    property topics -> array<str>;
    property visibility -> str;
    property openIssuesCount -> int64;
    property subscribersCount -> int64;
    property forksCount -> int64;
    property hasIssues -> bool;
    property stargazersCount -> int64;
    property watchersCount -> int64;
    property language -> str;
    property createdAt -> datetime;
    property updatedAt -> datetime;
    property pushedAt -> datetime;
    property description -> str;
    multi link issues -> Issue;
  }
}
 
# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
using future nonrecursive_access_policies;
