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
    property repository_url -> str;
    property labels_url -> str;
    property comments_url -> str;
    property events_url -> str;
    property html_url -> str;
    property node_id -> str;
    property number -> int64;
    property title -> str;
    link user -> GitHubUser;
    multi link labels -> Label;
    property state -> str;
    property locked -> bool;
    property assignee -> str;
    multi link assignees -> GitHubUser;
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
    property node_id -> str;
    property avatar_url -> str;
    property gravatar_id -> str;
    property url -> str;
    property html_url -> str;
    property followers_url -> str;
    property following_url -> str;
    property gists_url -> str;
    property starred_url -> str;
    property subscriptions_url -> str;
    property organizations_url -> str;
    property repos_url -> str;
    property events_url -> str;
    property received_events_url -> str;
    property type -> str;
    property site_admin -> bool;
    property name -> str;
    property company -> str;
    property blog -> str;
    property location -> str;
    property email -> str;
    property hireable -> bool;
    property bio -> str;
    property twitter_username -> str;
    property public_repos -> int64;
    property public_gists -> int64;
    property followers -> int64;
    property following -> int64;
    property created_at -> str;
    property updated_at -> str;
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
    property plus_one -> int64;
    property minus_one -> int64;
    property laugh -> int64;
    property hooray -> int64;
    property confused -> int64;
    property heart -> int64;
    property rocket -> int64;
    property eyes -> int64;
  }

  type GitHubRepo {
    property node_id -> str;
    property name -> str;
    property full_name -> str;
    property private -> bool;
    link owner -> RepoOwner;
    property html_url -> str;
    property description -> str;
    property fork -> bool;
    property url -> str;
    property forks_url -> str;
    property keys_url -> str;
    property collaborators_url -> str;
    property teams_url -> str;
    property hooks_url -> str;
    property issue_events_url -> str;
    property events_url -> str;
    property assignees_url -> str;
    property branches_url -> str;
    property tags_url -> str;
    property blobs_url -> str;
    property git_tags_url -> str;
    property git_refs_url -> str;
    property trees_url -> str;
    property statuses_url -> str;
    property languages_url -> str;
    property stargazers_url -> str;
    property contributors_url -> str;
    property subscribers_url -> str;
    property subscription_url -> str;
    property commits_url -> str;
    property git_commits_url -> str;
    property comments_url -> str;
    property issue_comment_url -> str;
    property contents_url -> str;
    property compare_url -> str;
    property merges_url -> str;
    property archive_url -> str;
    property downloads_url -> str;
    property issues_url -> str;
    property pulls_url -> str;
    property milestones_url -> str;
    property notifications_url -> str;
    property labels_url -> str;
    property releases_url -> str;
    property deployments_url -> str;
    property created_at -> datetime;
    property updated_at -> datetime;
    property pushed_at -> datetime;
    property git_url -> str;
    property ssh_url -> str;
    property clone_url -> str;
    property svn_url -> str;
    property homepage -> str;
    property size -> int64;
    property stargazers_count -> int64;
    property watchers_count -> int64;
    property language -> str;
    property has_issues -> bool;
    property has_projects -> bool;
    property has_downloads -> bool;
    property has_wiki -> bool;
    property has_pages -> bool;
    property has_discussions -> bool;
    property forks_count -> int64;
    property mirror_url -> str;
    property archived -> bool;
    property disabled -> bool;
    property open_issues_count -> int64;
    link license -> License;
    property allow_forking -> bool;
    property is_template -> bool;
    property web_commit_signoff_required -> bool;
    property topics -> array<str>;
    property visibility -> str;
    property forks -> int64;
    property open_issues -> int64;
    property watchers -> int64;
    property default_branch -> str;
    link permissions -> Permissions;
    property temp_clone_token -> str;
    property network_count -> int64;
    property subscribers_count -> int64;
    multi link issues -> Issue;
  }

  type RepoOwner {
    property login -> str;
    property node_id -> str;
    property avatar_url -> str;
    property gravatar_id -> str;
    property url -> str;
    property html_url -> str;
    property followers_url -> str;
    property following_url -> str;
    property gists_url -> str;
    property starred_url -> str;
    property subscriptions_url -> str;
    property organizations_url -> str;
    property repos_url -> str;
    property events_url -> str;
    property received_events_url -> str;
    property type -> str;
    property site_admin -> bool;
  }

  type License {
    property key -> str;
    property name -> str;
    property spdx_id -> str;
    property url -> str;
    property node_id -> str;
  }

  type Permissions {
    property admin -> bool;
    property maintain -> bool;
    property push -> bool;
    property triage -> bool;
    property pull -> bool;
  }
}
 
# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
using future nonrecursive_access_policies;
