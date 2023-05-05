import Excalidraw from './Excalidraw';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
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
	return (
		<div className='mt-6 mx-2 w-full'>
			<Excalidraw />
		</div>
	);
}
