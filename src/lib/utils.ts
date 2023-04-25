import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { auth } from './lucia';
import { IncomingMessage, OutgoingMessage } from 'http';
import { User } from 'lucia-auth';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getUser(req: IncomingMessage, res: OutgoingMessage) {
	//@ts-ignore
	const session = auth.handleRequest(req, res);
	const { user } = await session.validateUser();
	return user;
}
