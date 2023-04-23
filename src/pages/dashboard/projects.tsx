import { SidebarLinks, Sidebar } from '@/components/sidebar';
import { HomeIcon, PenTool, LayoutGrid, ImageIcon } from 'lucide-react';
import Head from 'next/head';

function Projects() {
	return <div>Projects</div>;
}

export default Projects;

Projects.getLayout = function getLayout(page: JSX.Element) {
	const sidebarLinks: SidebarLinks[] = [
		{
			name: 'Home',
			path: '/dashboard',
			icon: HomeIcon,
		},
		{ name: 'Projects', path: '/dashboard/projects', icon: PenTool },
		{ name: 'Issues', path: '/dashboard/issues', icon: LayoutGrid },
		{ name: 'Excalidraw', path: '/dashboard/excalidraw', icon: ImageIcon },
		// {
		// 	name: 'Issues',
		// 	path: '/dashboard/issues',
		// },
	];
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>

			<main className='flex flex-col w-full h-screen px-4'>
				<div className='w-2/12 py-4'>
					<Sidebar links={sidebarLinks} />

					{/* <Button variant='default' onClick={handleLogout}>
					Logout
				</Button> */}
					{page}
				</div>
			</main>
		</>
	);
};
