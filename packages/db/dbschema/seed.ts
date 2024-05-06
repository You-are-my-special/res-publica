import * as edgedb from "edgedb";

const client = edgedb.createClient();

async function main() {
  await client.execute(
    `
    insert Person { name := "Robert Downey Jr." };
    insert Person { name := "Scarlett Johansson" };
    insert Movie {
      title := <str>$title,
      actors := (
        select Person filter .name in {
          "Robert Downey Jr.",
          "Scarlett Johansson"
        }
      )
    }
  `,
    { title: "Iron Man 2" },
  );
}

main();
