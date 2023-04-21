import { auth } from '@/lib/lucia';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/Form';
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
