import { auth } from '@/lib/lucia';
import prisma from '@/lib/prisma';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { create } from 'domain';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createTRPCContext(opts: CreateNextContextOptions) {
	const { req, res } = opts;
	//@ts-ignore
	const authRequest = auth.handleRequest(req, res);
	const session = await authRequest.validateUser();

	const innerContext = await createInnerTRPCContext({
		session,
	});
	return {
		...innerContext,
		req,
		res,
	};
}
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
	session:
		| {
				user: null;
				session: null;
		  }
		| {
				user: {
					userId: string;
					username: string;
					email: string;
				};
				session: Readonly<{
					sessionId: string;
					userId: string;
					activePeriodExpiresAt: Date;
					idlePeriodExpiresAt: Date;
					state: 'idle' | 'active';
					fresh: boolean;
				}>;
		  };
}
/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createInnerTRPCContext(opts: CreateInnerContextOptions) {
	return {
		prisma,
		session: opts.session,
	};
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
