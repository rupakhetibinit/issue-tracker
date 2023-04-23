import { Sidebar, SidebarLinks } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/lucia';
import { trpc } from '@/utils/trpc';
import { User } from 'lucia-auth';
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
	HomeIcon,
	ImageIcon,
	LayoutGrid,
	LucideIcon,
	PenTool,
} from 'lucide-react';
import {
	ReactElement,
	JSXElementConstructor,
	ReactFragment,
	ReactPortal,
	ReactNode,
	PropsWithChildren,
} from 'react';

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ user: User }>> => {
	const authRequest = auth.handleRequest(context.req, context.res);
	const { user } = await authRequest.validateUser();
	if (!user)
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};
	// if (!user.firstName && !user.lastName) {
	// 	return {
	// 		redirect: {
	// 			destination: '/setup',
	// 			permanent: false,
	// 		},
	// 	};
	// }
	return {
		props: {
			user,
		},
	};
};

function Dashboard(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const hello = trpc.hello.useQuery({ text: 'From TRPC' });
	const proto = trpc.authed.useQuery();

	return <></>;
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page: JSX.Element) {
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

			<main className='flex flex-row w-full h-screen px-4'>
				<div className='w-2/12 py-4'>
					<Sidebar links={sidebarLinks} />

					{/* <Button variant='default' onClick={handleLogout}>
					Logout
				</Button> */}
				</div>
				{page}
			</main>
		</>
	);
};
