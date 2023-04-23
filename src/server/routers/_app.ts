import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../trpc';

export const appRouter = router({
	hello: publicProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input }) => {
			return {
				greeting: `hello ${input.text}`,
			};
		}),
	authed: protectedProcedure.query(({ ctx }) => {
		return {
			greeting: 'Hello from protected procedure' + ' ' + ctx.session.userId,
		};
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
