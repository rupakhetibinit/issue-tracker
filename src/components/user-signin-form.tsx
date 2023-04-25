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

		formState: { errors, isSubmitting },
	} = useForm<FormData>();
	const onSubmit = handleSubmit(async ({ username, password }) => {
		console.log(username, password);
		const response = await fetch('/api/signin', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
			}),
		});
		console.log(response);
		if (response.redirected) return router.push(response.url);
	});
	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='username'>
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

						<Label className='sr-only' htmlFor='password'>
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
						Sign In
					</Button>
				</div>
			</form>
		</div>
	);
}
