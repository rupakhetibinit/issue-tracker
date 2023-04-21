import { auth } from '@/lib/lucia';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
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

function Signin() {
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

export default Signin;
type FormData = {
	username: string;
	password: string;
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
		const response = await fetch('/api/signin', {
			method: 'POST',
			body: JSON.stringify({
				username: data.username,
				password: data.password,
			}),
		});
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
