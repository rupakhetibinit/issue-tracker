import { PropsWithChildren } from 'react';
import { Sidebar } from './sidebar';
import { Separator } from './ui/separator';

export default function DashboardLayout(props: PropsWithChildren) {
	return (
		<main className='flex flex-row w-full h-screen'>
			<div className='w-2/12'>
				<Sidebar />
			</div>
			<Separator orientation='vertical' className='m-1' />
			{props.children}
		</main>
	);
}
