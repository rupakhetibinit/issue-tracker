import { type SidebarLinks } from '@/components/sidebar';
import { Sidebar } from '@/components/sidebar';
import { HomeIcon, PenTool, LayoutGrid, ImageIcon } from 'lucide-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/utils/trpc';
import DashboardLayout from '@/components/dashboard-layout';

function Project() {
	const router = useRouter();
	//@ts-ignore
	console.log(router);
	const id = router.query['id'];
	console.log(id);
	const { data: project } = trpc.project.getProjectById.useQuery({
		id: id as string,
	});
	return (
		<div className='mt-6 mx-2 w-full'>
			{!project && <div>That resource doesn&apos;t exist in our server</div>}
			{id}
			{project && <div>{project.title}</div>}
		</div>
	);
}

export default Project;
Project.getLayout = function getLayout(page: JSX.Element) {
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>

			<DashboardLayout>{page}</DashboardLayout>
		</>
	);
};
