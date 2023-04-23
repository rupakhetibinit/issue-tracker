import { Button } from '@/components/ui/button';
import { auth } from '@/lib/lucia';
import { User } from 'lucia-auth';
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
	if (!user.firstName && !user.lastName) {
		return {
			redirect: {
				destination: '/setup',
				permanent: false,
			},
		};
	}
	return {
		props: {
			user,
		},
	};
};

function Dashboard(
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
	const router = useRouter();
	async function handleLogout() {
		try {
			await fetch('/api/logout', {
				method: 'POST',
			});
			router.push('/signin');
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>
			<main className='flex min-h-screen'>
				<div className='w-3/12 px-2 py-4'>
					<div className='text-2xl font-bold tracking-wider font-mono'>
						Issue Tracker
					</div>
					<div>Image</div>
					<div>{props.user.firstName + ' ' + props.user.lastName}</div>
					<div>@{props.user.username}</div>
					<div>Search</div>
					<div className='flex flex-col'>
						{linksInPage.map((value) => (
							<Link key={value} href={value.split(' ').join('').toLowerCase()}>
								{value}
							</Link>
						))}
					</div>
				</div>
				<Button variant='default' onClick={handleLogout}>
					Logout
				</Button>
			</main>
		</>
	);
}

export default Dashboard;

const linksInPage = ['Home', 'Projects', 'Kanban Board'];
