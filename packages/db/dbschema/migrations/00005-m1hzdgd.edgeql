CREATE MIGRATION m1hzdgdvfnokentlhnyelzg7tg54i7thwge6ph3dczx6qiqycwbpja
    ONTO m1sxydi62nrrcscob3wzv53zzsyr6kp57vixtrtaupkurwd2i4ixpa
{
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY avatarUrl {
          RENAME TO avatar_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY createdAt {
          RENAME TO created_at;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY eventsUrl {
          RENAME TO events_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY followersUrl {
          RENAME TO followers_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY followingUrl {
          RENAME TO following_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY gistsUrl {
          RENAME TO gists_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY gravatarId {
          RENAME TO gravatar_id;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY htmlUrl {
          RENAME TO html_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY nodeId {
          RENAME TO node_id;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY organizationsUrl {
          RENAME TO organizations_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY publicGists {
          RENAME TO public_gists;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY publicRepos {
          RENAME TO public_repos;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY receivedEventsUrl {
          RENAME TO received_events_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY reposUrl {
          RENAME TO repos_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY siteAdmin {
          RENAME TO site_admin;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY starredUrl {
          RENAME TO starred_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY subscriptionsUrl {
          RENAME TO subscriptions_url;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY twitterUsername {
          RENAME TO twitter_username;
      };
  };
  ALTER TYPE default::GitHubUser {
      ALTER PROPERTY updatedAt {
          RENAME TO updated_at;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY activeLockReason {
          RENAME TO active_lock_reason;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY authorAssociation {
          RENAME TO author_association;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY closedAt {
          RENAME TO closed_at;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY commentsUrl {
          RENAME TO comments_url;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY createdAt {
          RENAME TO created_at;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY eventsUrl {
          RENAME TO events_url;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY htmlUrl {
          RENAME TO html_url;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY labelsUrl {
          RENAME TO labels_url;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY nodeId {
          RENAME TO node_id;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY performedViaGithubApp {
          RENAME TO performed_via_github_app;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY repositoryUrl {
          RENAME TO repository_url;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY stateReason {
          RENAME TO state_reason;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY timelineUrl {
          RENAME TO timeline_url;
      };
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY updatedAt {
          RENAME TO updated_at;
      };
  };
  ALTER TYPE default::Reaction {
      ALTER PROPERTY minusOne {
          RENAME TO minus_one;
      };
  };
  ALTER TYPE default::Reaction {
      ALTER PROPERTY plusOne {
          RENAME TO plus_one;
      };
  };
  ALTER TYPE default::Reaction {
      ALTER PROPERTY totalCount {
          RENAME TO total_count;
      };
  };
};
