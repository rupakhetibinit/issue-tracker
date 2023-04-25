import { Roles } from '@prisma/client';
import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';

export const projectRouter = router({
	getAllProjects: protectedProcedure.query(async ({ ctx }) => {
		const projects = await ctx.prisma.project.findMany({
			where: {
				members: {
					some: {
						userId: ctx.session.userId,
					},
				},
			},
		});

		return projects;
	}),
	createProject: protectedProcedure
		.input(
			z
				.object({
					title: z.string(),
					description: z.string(),
				})
				.required()
		)
		.mutation(async ({ input, ctx }) => {
			try {
				const project = await ctx.prisma.project.create({
					data: {
						title: input.title,
						description: input.description,
					},
				});
				await ctx.prisma.userOnProject.create({
					data: {
						userId: ctx.session.userId,
						projectId: project.id,
						role: Roles.ADMIN,
					},
				});
				return project;
			} catch (error) {
				console.log(error);
			}
		}),
});
