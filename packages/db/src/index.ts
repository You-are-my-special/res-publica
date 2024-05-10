import { createClient, Duration, IsolationLevel } from "edgedb";

import e from "../dbschema/edgeql-js";
import { env } from "./env";

const baseClient = createClient({
  instanceName: env.EDGEDB_INSTANCE,
  secretKey: env.EDGEDB_SECRET_KEY,
});

export const db = baseClient
  .withConfig({
    // 10 seconds
    session_idle_transaction_timeout: Duration.from({ seconds: 10 }),
    // 0 seconds === no timeout
    query_execution_timeout: Duration.from({ seconds: 0 }),
    allow_bare_ddl: "NeverAllow",
    allow_user_specified_id: false,
    apply_access_policies: true,
  })
  .withRetryOptions({
    attempts: 3,
    backoff: (attemptNo: number) => {
      // exponential backoff
      return 2 ** attemptNo * 100 + Math.random() * 100;
    },
  })
  .withTransactionOptions({
    isolation: IsolationLevel.Serializable, // only supported value
    deferrable: false,
    readonly: false,
  });

export const dbQueryBuilder = e;
export * from "../dbschema/edgeql-js";
