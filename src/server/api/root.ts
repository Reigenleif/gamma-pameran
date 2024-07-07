import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { storageRouter } from "./routers/storage";
import { profileRouter } from "./routers/profile";
import { productRouter } from "./routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  storage: storageRouter,
  profile: profileRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
