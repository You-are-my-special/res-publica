CREATE MIGRATION m1ph7mzuq3smqi2qg2dersisw2eh3mgujfwrbkhnhlrflvjmggg5lq
    ONTO m1eyguovjnuvvepgjdh5rhhwm54obpo7no456jx6meod6rgm5bofoq
{
  ALTER TYPE default::Movie {
      DROP LINK actors;
  };
  ALTER TYPE default::Movie RENAME TO default::BlogPost;
  ALTER TYPE default::BlogPost {
      CREATE REQUIRED PROPERTY content: std::str {
          SET default := '';
      };
      ALTER PROPERTY title {
          DROP CONSTRAINT std::exclusive;
      };
  };
  DROP TYPE default::Person;
};
