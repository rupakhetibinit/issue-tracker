import DashboardLayout from '@/components/dashboard-layout';
import { SidebarLinks, Sidebar } from '@/components/sidebar';
import { Separator } from '@/components/ui/separator';
import { HomeIcon, PenTool, LayoutGrid, ImageIcon } from 'lucide-react';
import Head from 'next/head';

function Issues() {
	return <div className='mt-6 mx-2 w-full'>Issues</div>;
}

export default Issues;

Issues.getLayout = function getLayout(page: JSX.Element) {
	return (
		<>
			<Head>
				<title>Track issues | Issue Tracker</title>
			</Head>

			<DashboardLayout>{page}</DashboardLayout>
		</>
	);
};
