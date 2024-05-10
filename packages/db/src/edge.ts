import { createHttpClient } from "edgedb";

import { env } from "./env";

export const client = createHttpClient({
  instanceName: env.EDGEDB_INSTANCE,
  secretKey: env.EDGEDB_SECRET_KEY,
});

export const edgeClient = client;
