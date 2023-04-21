import lucia from 'lucia-auth';
import { node } from 'lucia-auth/middleware';
import prisma from '@lucia-auth/adapter-prisma';
import { Prisma, PrismaClient } from '@prisma/client';
import 'lucia-auth/polyfill/node';
const client = new PrismaClient();

export const auth = lucia({
	adapter: prisma(client),
	env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
	middleware: node(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username,
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email,
		};
	},
});

export type Auth = typeof auth;
