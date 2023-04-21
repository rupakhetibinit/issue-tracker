'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormData = {
	username: string;
	password: string;
};
export const Form = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		clearErrors,
		formState: { errors, dirtyFields, isDirty, touchedFields },
	} = useForm<FormData>();
	const onSubmit = handleSubmit(async (data) => {
		const response = await fetch('/api/signin', {
			method: 'POST',
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
		});
		console.log(response);
		if (response.redirected) return router.push(response.url);
	});

	return (
		<>
			<form
				onSubmit={onSubmit}
				className='flex flex-col justify-center space-y-2'>
				<label htmlFor='email'>Email</label>
				<input
					// onClick={() => clearErrors('email')}
					className='px-4 py-2 rounded-sm border-blue-500 border '
					id='email'
					type='text'
					{...register('username', {
						required: 'username is required',
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
					Sign In
				</button>
			</form>
			{errors.username?.message && (
				<span className='text-red-500'>{errors.username.message}</span>
			)}
			{errors.password?.message && (
				<span className='text-red-500'>{errors.password.message}</span>
			)}
		</>
	);
};
