CREATE MIGRATION m1vo6t2ngq2nsvfbqkjkrpejytgpcjp4txclq5xojusbewh3y2pvra
    ONTO m1w6bu3tgkvof7uc3gt4crozqrnyrylnb6jqkcto4xrg4qbxcf3mza
{
  ALTER TYPE default::Issue {
      DROP LINK assignees;
  };
};
