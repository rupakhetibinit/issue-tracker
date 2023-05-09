import { Priority, Roles } from '@prisma/client';
import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';

export const issueRouter = router({
	getAllIssues: protectedProcedure.query(async ({ ctx }) => {
		const assignedIssues = await ctx.prisma.issue.findMany({
			where: {
				assigned: {
					authUserId: ctx.session.userId,
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
							authUserId: true,
						},
					},
				},
			});
			console.log(isUserAdmin);
			if (
				isUserAdmin?.members.filter(
					({ role, authUserId }) =>
						role === Roles.ADMIN && authUserId === ctx.session.userId
				).length !== 0
			) {
				return await ctx.prisma.issue.create({
					data: {
						content: input.content,
						priority: input.priority,
						title: input.title,
						projectId: input.projectId,
						memberProjectId: input.projectId,
						memberUserId: ctx.session.userId,
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
	updateIssue: protectedProcedure
		.input(
			z
				.object({
					issueId: z.string(),
					issueContent: z.string(),
					issuePriority: z.nativeEnum(Priority),
				})
				.required()
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.issue.update({
				where: {
					id: input.issueId,
				},
				data: {
					content: input.issueContent,
					priority: input.issuePriority,
				},
			});
		}),
});
