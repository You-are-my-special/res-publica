import * as edgedb from "edgedb";

import { Movie } from "./interfaces";

const client = edgedb.createClient();

async function main() {
  // result will be inferred as Movie | null
  const result = await client.querySingle<Movie>(`
    select Movie {
      title,
      actors: {
        name,
      }
    } filter .title = "Iron Man 2"
  `);

  console.log(JSON.stringify(result, null, 2));
}

main();
