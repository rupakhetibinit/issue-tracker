import { type } from 'os';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Login() {
	return (
		<main className='flex min-h-screen'>
			<div className='flex w-4/12 justify-center flex-col items-center'>
				<span className='mb-16 text-4xl font-bold'>Login to Issue Tracker</span>
				<Form />
			</div>
			<div className='flex w-8/12 bg-blue-400'></div>
		</main>
	);
}

export default Login;
type FormData = {
	email: string;
	password: string;
};
const Form = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<>
			<form
				onSubmit={onSubmit}
				className='flex flex-col justify-center space-y-2'>
				<label htmlFor='email'>Email</label>
				<input
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='email'
					type='email'
					{...register('email', { required: true, maxLength: 64 })}
				/>
				<label htmlFor='email'>Password</label>
				<input
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='password'
					{...register('password', {
						required: true,
						maxLength: 64,
						minLength: 6,
					})}
					type='password'
				/>
				<button
					className='px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-md text-white'
					type='submit'>
					Sign Up
				</button>
			</form>
			{errors?.password?.message}
			{errors.email?.message && (
				<span className='text-red-500'>{errors.email.message}</span>
			)}
			{errors.password?.message && (
				<span className='text-red-500'>{errors.password.message}</span>
			)}
		</>
	);
};
