import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = {
	username: string;
	password: string;
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		clearErrors,

		formState: { errors, dirtyFields, isDirty, touchedFields, isSubmitting },
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
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='melontusk123'
							type='text'
							autoCapitalize='none'
							autoComplete='username'
							autoCorrect='off'
							disabled={isSubmitting}
							{...register('username', {
								required: 'Username is required',
							})}
						/>
						<div className='text-red-500 text-sm'>
							{errors.username?.message}
						</div>

						<Label className='sr-only' htmlFor='email'>
							Email
						</Label>
						<Input
							id='password'
							placeholder='********'
							type='password'
							autoCapitalize='none'
							autoComplete='password'
							autoCorrect='off'
							disabled={isSubmitting}
							{...register('password', {
								required: 'Password is required',
								maxLength: {
									value: 64,
									message: 'Password must be less than 64 characters',
								},
								minLength: {
									value: 6,
									message: 'Password must be more than 6 characters',
								},
							})}
						/>
						<div className='text-red-500 text-sm'>
							{errors.password && errors.password?.message}
						</div>
					</div>
					<Button type='submit' disabled={isSubmitting}>
						{isSubmitting && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						Sign In
					</Button>
				</div>
			</form>
			{/* <div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or continue with
					</span>
				</div>
			</div>
			<Button variant='outline' type='button' disabled={isSubmitting}>
				{isSubmitting ? (
					<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
				) : (
					<Icons.gitHub className='mr-2 h-4 w-4' />
				)}{' '}
				Github
			</Button> */}
		</div>
	);
}

const FormError = (message: string | undefined) => {
	return <div className='bg-red-500'>{message}</div>;
};
