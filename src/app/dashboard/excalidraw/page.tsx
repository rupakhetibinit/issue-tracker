import prisma from '@/lib/prisma';
import Excalidraw from './Excalidraw';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Session } from 'lucia-auth';
import axios from 'axios';
export const metadata = {
	title: 'Excalidraw | Issue Tracker',
	description: 'Draw to your hearts content',
};

export default async function Page() {
	const cookieStore = cookies();
	const session = cookieStore.get('auth_session');

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
