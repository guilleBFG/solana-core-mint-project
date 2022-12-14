import { router } from "../trpc";
import { mainRouter } from "./mainRouter";

export const appRouter = router({
  connectionRouter: mainRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
