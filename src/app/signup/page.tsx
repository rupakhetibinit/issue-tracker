import { auth } from '@/lib/lucia';
import { clear } from 'console';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type } from 'os';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/SignupForm';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
async function handleRequest(request: NextRequest, response: NextResponse) {
	const authRequest = auth.handleRequest(request, response);
	const session = await authRequest.validate();
	if (session) {
		// redirect the user if authenticated
		redirect('/dashboard');
	}
}

async function Login() {
	await handleRequest(request, response);

	return (
		<>
			<Head>
				<title>Signup | Issue Tracker</title>
			</Head>
			<main className='flex min-h-screen'>
				<div className='flex w-4/12 justify-center flex-col items-center'>
					<span className='mb-16 text-4xl font-bold'>
						Login to Issue Tracker
					</span>
					<Form />
				</div>
				<div className='flex w-8/12 bg-blue-400'></div>
			</main>
		</>
	);
}

export default Login;
