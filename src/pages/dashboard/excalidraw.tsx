import Head from 'next/head';
import DashboardLayout from '@/components/dashboard-layout';

function Excalidraw() {
	return <div className='mt-6 mx-2 w-full'>Excalidraw</div>;
}

export default Excalidraw;

Excalidraw.getLayout = function getLayout(page: JSX.Element) {
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>

			<DashboardLayout>{page}</DashboardLayout>
		</>
	);
};
