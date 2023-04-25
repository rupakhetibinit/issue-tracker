import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';
import { ZodError, transformer } from 'zod';
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.session?.user?.userId || !ctx.session.session) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}
	return next({
		ctx: {
			session: ctx.session.session,
			user: ctx.session.user,
		},
	});
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
