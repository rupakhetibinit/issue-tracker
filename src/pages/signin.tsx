// import { Input } from '@/components/ui/input';
// import { auth } from '@/lib/lucia';
// import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
// import { useRouter } from 'next/router';
// import { useForm } from 'react-hook-form';

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> => {
	const authRequest = auth.handleRequest(context.req, context.res);
	const session = await authRequest.validate();
	if (session) {
		// redirect the user if authenticated
		return {
			redirect: {
				destination: '/dashboard',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};

// function Signin() {
// 	return (
// 		<main className='flex min-h-screen'>
// 			<div className='flex w-4/12 justify-center flex-col items-center'>
// 				<span className='mb-16 text-4xl font-bold'>Login to Issue Tracker</span>
// 				<Form />
// 			</div>
// 			<div className='flex w-8/12 bg-blue-400'></div>
// 		</main>
// 	);
// }

// export default Signin;
// type FormData = {
// 	username: string;
// 	password: string;
// };
// const Form = () => {
// 	const router = useRouter();
// 	const {
// 		register,
// 		handleSubmit,
// 		clearErrors,
// 		formState: { errors, dirtyFields, isDirty, touchedFields },
// 	} = useForm<FormData>();
// 	const onSubmit = handleSubmit(async (data) => {
// 		const response = await fetch('/api/signin', {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				username: data.username,
// 				password: data.password,
// 			}),
// 		});
// 		if (response.redirected) return router.push(response.url);
// 	});

// 	return (
// 		<>
// 			<form
// 				onSubmit={onSubmit}
// 				className='flex flex-col justify-center space-y-2'>
// 				<label htmlFor='email'>Email</label>
// 				<Input
// 					// onClick={() => clearErrors('email')}
// 					// className='px-4 py-2 rounded-sm border-blue-500 border '
// 					// id='email'
// 					type='text'
// 					placeholder='Username'
// 					{...register('username', {
// 						required: 'username is required',
// 						maxLength: 64,
// 					})}
// 				/>
// 				<label htmlFor='password'>Password</label>
// 				<input
// 					// onClick={() => clearErrors('password')}
// 					className='px-4 py-2 rounded-sm border-blue-500 border '
// 					id='password'
// 					{...register('password', {
// 						required: 'Password is required',
// 						maxLength: 64,
// 						minLength: {
// 							message: 'Password must be minimum 6 characters',
// 							value: 6,
// 						},
// 					})}
// 					type='password'
// 				/>
// 				<button
// 					className='px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white'
// 					type='submit'>
// 					Sign In
// 				</button>
// 			</form>
// 			{errors.username?.message && (
// 				<span className='text-red-500'>{errors.username.message}</span>
// 			)}
// 			{errors.password?.message && (
// 				<span className='text-red-500'>{errors.password.message}</span>
// 			)}
// 		</>
// 	);
// };
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	Metadata,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Command } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from '@/components/user-signin-form';
import Head from 'next/head';
import { auth } from '@/lib/lucia';

export default function AuthenticationPage() {
	return (
		<>
			<Head>
				<title>Login | Issue Tracker</title>
			</Head>
			<div className='md:hidden'>
				<Image
					src='/examples/authentication-light.png'
					width={1280}
					height={843}
					alt='Authentication'
					className='block dark:hidden'
				/>
				<Image
					src='/examples/authentication-dark.png'
					width={1280}
					height={843}
					alt='Authentication'
					className='hidden dark:block'
				/>
			</div>
			<div className='container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
				<Link
					href='/signup'
					className={cn(
						buttonVariants({ variant: 'outline', size: 'sm' }),
						'absolute right-4 top-4 md:right-8 md:top-8'
					)}>
					Sign Up
				</Link>
				<div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
					<div
						className='absolute inset-0 bg-cover'
						style={{
							backgroundImage:
								'url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)',
						}}
					/>
					<div className='relative z-20 flex items-center text-lg font-medium'>
						<Command className='mr-2 h-6 w-6' /> Issue Tracker
					</div>
					<div className='relative z-20 mt-auto'>
						<blockquote className='space-y-2'>
							<span className='text-2xl font-bold tracking-wide shadow-md backdrop-blur-md'>
								Squash. Track. Fix.
							</span>
							<br />
							<span className='text-2xl font-bold tracking-wide shadow-md backdrop-blur-md'>
								Destroy Every Bug
							</span>
						</blockquote>
					</div>
				</div>
				<div className='lg:p-8'>
					<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
						<div className='flex flex-col space-y-2 text-center'>
							<h1 className='text-2xl font-semibold tracking-tight'>
								Create an account
							</h1>
							<p className='text-sm text-muted-foreground'>
								Enter your email below to create your account
							</p>
						</div>
						<UserAuthForm />
						{/* <p className='px-8 text-center text-sm text-muted-foreground'>
							By clicking continue, you agree to our{' '}
							<Link
								href='/terms'
								className='underline underline-offset-4 hover:text-primary'>
								Terms of Service
							</Link>{' '}
							and{' '}
							<Link
								href='/privacy'
								className='underline underline-offset-4 hover:text-primary'>
								Privacy Policy
							</Link>
							.
						</p> */}
					</div>
				</div>
			</div>
		</>
	);
}
