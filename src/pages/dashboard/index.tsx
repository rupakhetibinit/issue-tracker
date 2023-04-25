import { auth } from '@/lib/lucia';
import { User } from 'lucia-auth';
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import UserActions from '@/components/user-actions';
import DashboardLayout from '@/components/dashboard-layout';

export const getServerSideProps = async ({
	req,
	res,
}: GetServerSidePropsContext): Promise<
	GetServerSidePropsResult<{ user: User }>
> => {
	//@ts-ignore
	const session = auth.handleRequest(req, res);
	const { user } = await session.validateUser();

	if (!user)
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};

	return {
		props: {
			user,
		},
	};
};

function Dashboard(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	return (
		<div className='mt-6 mx-2 w-full'>
			<UserActions username={props.user.username} />
			<Card className='w-max px-4 h-max'>
				<CardHeader>
					<CardTitle>Projects</CardTitle>
					<CardDescription>Card Description</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	);
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page: JSX.Element) {
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>

			<DashboardLayout>{page}</DashboardLayout>
		</>
	);
};
