import prisma from '@/lib/prisma';
import Excalidraw from './Excalidraw';
import { redirect } from 'next/navigation';
import { Session } from 'lucia-auth';
import axios from 'axios';
export const metadata = {
	title: 'Excalidraw | Issue Tracker',
	description: 'Draw to your hearts content',
};

async function getUser() {
	const response = axios.get<Session>(
		'http://localhost:3000/api/getusercookie',
		{
			withCredentials: true,
		}
	);
	return response;
}

export default async function Page() {
	const session = await getUser();
	if (!session) {
		return redirect('/signin');
	}
	console.log('excalidraw');
	return (
		<div className='mt-6 mx-2 w-full'>
			<Excalidraw />
		</div>
	);
}
