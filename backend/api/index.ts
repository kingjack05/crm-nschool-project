import { Hono } from "hono";
import { handle } from "hono/vercel";
import { RPCHandler } from "@orpc/server/fetch";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { cors } from "hono/cors";
import { router } from "../router/index.js";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

const rpcHandler = new RPCHandler(router);

app.use(cors());

app.use("/rpc/*", async (c, next) => {
  const { matched, response } = await rpcHandler.handle(c.req.raw, {
    prefix: "/api/rpc",
    context: {}, // Provide initial context if needed
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

const openapiHandler = new OpenAPIHandler(router);

app.use("/rest/*", async (c, next) => {
  console.log(c.req.url);
  const { matched, response } = await openapiHandler.handle(c.req.raw, {
    prefix: "/api/rest",
    context: {}, // Provide initial context if needed
  });
  console.log("matched", matched);
  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export default handle(app);
