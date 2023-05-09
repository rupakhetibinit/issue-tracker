import { Separator } from '../../components/ui/separator';
import { Sidebar } from './Sidebar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='flex flex-row w-full h-screen'>
			<div className='w-2/12'>
				<Sidebar />
			</div>
			<Separator orientation='vertical' className='m-1' />
			{children}
		</main>
	);
}
