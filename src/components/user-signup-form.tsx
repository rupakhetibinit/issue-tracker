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
	email: string;
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
		const response = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({
				username: data.username,
				password: data.password,
				email: data.email,
			}),
		});
		if (response.redirected) return router.push(response.url);
	});
	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label htmlFor='username' className='text-slate-800'>
							Username
						</Label>
						<Input
							id='username'
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

						<Label htmlFor='email' className='text-slate-800'>
							Email
						</Label>
						<Input
							id='email'
							placeholder='johndoe@gmail.com'
							type='email'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isSubmitting}
							{...register('email', {
								required: 'email is required',
							})}
						/>
						<div className='text-red-500 text-sm'>{errors.email?.message}</div>

						<Label htmlFor='username' className='text-slate-800'>
							Password
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
						Sign Up
					</Button>
				</div>
			</form>
		</div>
	);
}
