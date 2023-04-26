import { Roles } from '@prisma/client';
import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';

export const projectRouter = router({
	getAllProjects: protectedProcedure.query(async ({ ctx }) => {
		const projects = await ctx.prisma.project.findMany({
			where: {
				members: {
					some: {
						authUserId: ctx.session.userId,
					},
				},
			},
			include: {
				members: {
					where: {
						authUserId: ctx.user.userId,
					},
					select: {
						role: true,
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
				const member = await ctx.prisma.member.create({
					data: {
						projectId: project.id,
						authUserId: ctx.session.userId,
						role: Roles.ADMIN,
					},
				});
				if (member) {
					return project;
				}

				return project;
			} catch (error) {
				console.log(error);
			}
		}),
	getProjectById: protectedProcedure
		.input(z.object({ id: z.string() }).required())
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.project.findUnique({
				where: {
					id: input.id,
				},
				select: {
					_count: {
						select: {
							members: true,
						},
					},
					title: true,
					description: true,
					members: {
						select: {
							user: true,
							role: true,
						},
					},
				},
			});
		}),
});
