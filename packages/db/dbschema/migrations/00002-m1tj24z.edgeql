CREATE MIGRATION m1tj24zeozpnhbp7qxxqv5zgvvfpmc2odgqyng3ry4snkl6uvjwrtq
    ONTO m16y3fah4icpyuiltjfcmyinznei6oc2xwgo7le35yk3mjqcppiskq
{
  ALTER TYPE default::Repo {
      ALTER PROPERTY name {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE INDEX ON (.name);
  };
  ALTER TYPE default::Topic {
      ALTER PROPERTY name {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
