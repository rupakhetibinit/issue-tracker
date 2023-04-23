import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.session?.userId) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}
	return next({
		ctx: {
			session: ctx.session,
		},
	});
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
