import { auth } from '@/lib/lucia';
import { clear } from 'console';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { type } from 'os';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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

function Login() {
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
type FormData = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	username: string;
};
const Form = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors, dirtyFields, isDirty, touchedFields },
	} = useForm<FormData>();
	const onSubmit = handleSubmit(async (data) => {
		const response = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
			}),
		});
		if (response.redirected) return router.push(response.url);
	});

	return (
		<>
			<form
				onSubmit={onSubmit}
				className='flex flex-col justify-center space-y-2'>
				<label htmlFor='firstName'>First Name</label>
				<input
					// onClick={() => clearErrors('email')}
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='firstName'
					type='firstName'
					{...register('firstName', {
						required: 'First Name is Required',
						maxLength: 64,
					})}
				/>
				<label htmlFor='lastName'>Last Name</label>
				<input
					// onClick={() => clearErrors('email')}
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='lastName'
					type='lastName'
					{...register('lastName', {
						required: 'Last Name is Required',
						maxLength: 64,
					})}
				/>
				<label htmlFor='username'>Username</label>
				<input
					// onClick={() => clearErrors('email')}
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='username'
					type='username'
					{...register('username', {
						required: 'username is Required',
						maxLength: 64,
					})}
				/>
				<label htmlFor='email'>Email</label>
				<input
					// onClick={() => clearErrors('email')}
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='email'
					type='email'
					{...register('email', {
						required: 'Email Address is required',
						maxLength: 64,
					})}
				/>
				<label htmlFor='password'>Password</label>
				<input
					// onClick={() => clearErrors('password')}
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='password'
					{...register('password', {
						required: 'Password is required',
						maxLength: 64,
						minLength: {
							message: 'Password must be minimum 6 characters',
							value: 6,
						},
					})}
					type='password'
				/>
				<button
					className='px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white'
					type='submit'>
					Sign Up
				</button>
			</form>
			{errors.email?.message && (
				<span className='text-red-500'>{errors.email.message}</span>
			)}
			{errors.password?.message && (
				<span className='text-red-500'>{errors.password.message}</span>
			)}
			{errors.username?.message && (
				<span className='text-red-500'>{errors.username.message}</span>
			)}
		</>
	);
};
