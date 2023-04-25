import { router } from '../trpc';
import { projectRouter } from './project';
import { issueRouter } from './issue';
import { userRouter } from './user';

export const appRouter = router({
	project: projectRouter,
	issue: issueRouter,
	user: userRouter,
});
// export type definition of API

export type AppRouter = typeof appRouter;
