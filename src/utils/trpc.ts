import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/routers/_app';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

function getBaseUrl() {
	if (typeof window !== 'undefined')
		// browser should use relative path
		return '';

	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;

	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	config({ ctx }) {
		return {
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/api/trpc`,
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: 'include',
						});
					},

					// You can pass any HTTP headers you wish here
					async headers() {
						return {};
					},
				}),
			],
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false,

	abortOnUnmount: true,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
