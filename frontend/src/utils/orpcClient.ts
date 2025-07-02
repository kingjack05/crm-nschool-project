import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { Router } from "../../../backend/router";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

const link = new RPCLink({
  url: import.meta.env.ORPC_RPC_URL ?? "http://localhost:3000/api/rpc",
  headers: () => ({
    authorization: "Bearer token",
  }),
});

export const client: Router = createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);
