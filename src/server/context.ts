import { auth } from '@/lib/lucia';
import prisma from '@/lib/prisma';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
	const authRequest = auth.handleRequest(opts.req, opts.res);
	const session = await authRequest.validate();
	const contextInner = await createContextInner({ session });
	return {
		...contextInner,
		session,
	};
}
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
	session: Readonly<{
		sessionId: string;
		userId: string;
		activePeriodExpiresAt: Date;
		idlePeriodExpiresAt: Date;
		state: 'idle' | 'active';
		fresh: boolean;
	}> | null;
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
export async function createContextInner(opts?: CreateInnerContextOptions) {
	return {
		prisma,
		session: opts?.session,
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
