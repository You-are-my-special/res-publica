CREATE MIGRATION m1j7vjjwx7fumvyzwccxowcsqfgamzhpav6q37mpzobm6cgswh6fla
    ONTO m1pb2n7x3tlolchjwlmapy455djilnfkmokkhabjmefoohmzdybfva
{
  ALTER TYPE default::GitHubRepo {
      ALTER PROPERTY subscribersCount {
          SET TYPE std::int64 USING (<std::int64>.subscribersCount);
      };
  };
  ALTER TYPE default::GitHubUser {
      DROP PROPERTY bio;
      DROP PROPERTY blog;
      DROP PROPERTY company;
      DROP PROPERTY created_at;
      DROP PROPERTY email;
      DROP PROPERTY events_url;
      DROP PROPERTY followers;
      DROP PROPERTY followers_url;
      DROP PROPERTY following;
      DROP PROPERTY following_url;
      DROP PROPERTY gists_url;
      DROP PROPERTY gravatar_id;
      DROP PROPERTY hireable;
      DROP PROPERTY location;
      DROP PROPERTY node_id;
      DROP PROPERTY organizations_url;
      DROP PROPERTY public_gists;
      DROP PROPERTY public_repos;
      DROP PROPERTY received_events_url;
      DROP PROPERTY repos_url;
      DROP PROPERTY site_admin;
      DROP PROPERTY starred_url;
      DROP PROPERTY subscriptions_url;
      DROP PROPERTY twitter_username;
      DROP PROPERTY type;
      DROP PROPERTY updated_at;
      DROP PROPERTY url;
  };
  ALTER TYPE default::Issue {
      ALTER PROPERTY comments_url {
          RENAME TO repositoryUrl;
      };
  };
  ALTER TYPE default::Issue {
      DROP PROPERTY events_url;
      DROP PROPERTY html_url;
      DROP PROPERTY labels_url;
      DROP PROPERTY node_id;
      DROP PROPERTY repository_url;
  };
  ALTER TYPE default::Reaction {
      ALTER PROPERTY minus_one {
          RENAME TO minusOne;
      };
  };
  ALTER TYPE default::Reaction {
      ALTER PROPERTY plus_one {
          RENAME TO plusOne;
      };
  };
};
