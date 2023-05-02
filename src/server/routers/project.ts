import { Member, Roles } from '@prisma/client';
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
	getMembersOfProject: protectedProcedure
		.input(z.object({ projectId: z.string() }).required())
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.member.findMany({
				where: {
					projectId: input.projectId,
				},
				include: {
					user: {
						select: {
							username: true,
							firstName: true,
							lastName: true,
							id: true,
						},
					},
				},
			});
		}),
	createMemberInProject: protectedProcedure
		.input(
			z.object({
				projectId: z.string(),
				userList: z
					.object({
						firstName: z.string().nullable().optional(),
						lastName: z.string().nullable().optional(),
						username: z.string(),
					})
					.required()
					.array(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			let addedUsers: Member[] = [];
			input.userList.map(async (user) => {
				const addedUser = await ctx.prisma.member.create({
					data: {
						user: {
							connect: {
								username: user.username,
							},
						},
						project: {
							connect: {
								id: input.projectId,
							},
						},
						role: Roles.USER,
					},
				});
				addedUsers.push(addedUser);
			});
			return addedUsers;
		}),
	deleteMemberInProject: protectedProcedure
		.input(
			z.object({ authUserId: z.string(), projectId: z.string() }).required()
		)
		.mutation(async ({ ctx, input }) => {
			const admin = await ctx.prisma.member.findUnique({
				where: {
					projectId_authUserId: {
						authUserId: ctx.session.userId,
						projectId: input.projectId,
					},
				},
			});
			if (admin?.role === 'ADMIN' && admin?.projectId === input.projectId) {
				const deleted = await ctx.prisma.member.delete({
					where: {
						projectId_authUserId: {
							projectId: input.projectId,
							authUserId: input.authUserId,
						},
					},
				});
			}
		}),
	getAllMembersExceptYourself: protectedProcedure
		.input(z.object({ projectId: z.string() }).required())
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.authUser.findMany({
				where: {
					NOT: {
						OR: [
							{
								id: ctx.session.userId,
							},
							{
								members: {
									some: {
										projectId: input.projectId,
									},
								},
							},
						],
					},
				},
				select: {
					username: true,
					firstName: true,
					lastName: true,
				},
			});
		}),
	// removeUser: protectedProcedure.input(z.object({username:z.string()}).required()).query(async ({ctx,input})=>{
	//   return await ctx.prisma.
	// })
});
