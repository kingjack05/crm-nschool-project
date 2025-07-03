import { ORPCError, os, RouterClient } from "@orpc/server";
import { z } from "zod";
import { db } from "../db/index.js";
import { planetsTable } from "../db/schema.js";

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional().nullable(),
});

export const listPlanet = os
  .route({ method: "GET", path: "/planets" })
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    })
  )
  .output(z.array(PlanetSchema))
  .handler(async ({ input }) => {
    const planets = await db.select().from(planetsTable);
    return planets;
  });

export const findPlanet = os
  .route({ method: "GET", path: "/planets/{id}" })
  .input(PlanetSchema.pick({ id: true }))
  .output(PlanetSchema)
  .handler(async ({ input }) => {
    // your find code here
    return { id: 1, name: "name" };
  });

// export const createPlanet = os
//   .$context<{ headers: IncomingHttpHeaders }>()
//   .use(({ context, next }) => {
//     const user = parseJWT(context.headers.authorization?.split(' ')[1])

//     if (user) {
//       return next({ context: { user } })
//     }

//     throw new ORPCError('UNAUTHORIZED')
//   })
//   .input(PlanetSchema.omit({ id: true }))
//   .handler(async ({ input, context }) => {
//     // your create code here
//     return { id: 1, name: 'name' }
//   })

export const router = {
  planet: {
    list: listPlanet,
    find: findPlanet,
    // create: createPlanet
  },
};

export type Router = RouterClient<typeof router>;
