import { Priority, Roles } from '@prisma/client';
import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';

export const issueRouter = router({
	getAllIssues: protectedProcedure.query(async ({ ctx }) => {
		const assignedIssues = await ctx.prisma.issue.findMany({
			where: {
				assignedUsers: {
					some: {
						userId: ctx.session.userId,
					},
				},
			},
		});

		return assignedIssues;
	}),
	createIssue: protectedProcedure
		.input(
			z
				.object({
					title: z.string(),
					content: z.string(),
					priority: z.nativeEnum(Priority),
					projectId: z.string(),
					// assignedToId: z.string().optional(),
				})
				.required()
		)
		.mutation(async ({ ctx, input }) => {
			const isUserAdmin = await ctx.prisma.project.findUnique({
				where: {
					id: input.projectId,
				},
				include: {
					members: {
						select: {
							role: true,
							userId: true,
						},
					},
				},
			});
			console.log(isUserAdmin);
			if (
				isUserAdmin?.members.filter(
					({ role, userId }) =>
						role === Roles.ADMIN && userId === ctx.session.userId
				).length !== 0
			) {
				return await ctx.prisma.issue.create({
					data: {
						content: input.content,
						priority: input.priority,
						title: input.title,
						projectId: input.projectId,
						assignedUsers: {
							create: {
								projectId: input.projectId,
								userId: ctx.session.userId,
							},
						},
					},
				});
			} else {
				return {
					message: false,
				};
			}
		}),
	getAllIssueByProject: protectedProcedure
		.input(z.object({ projectId: z.string() }).required())
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.issue.findMany({
				where: {
					projectId: input.projectId,
				},
			});
		}),
});
