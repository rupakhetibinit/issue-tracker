import { SidebarLinks, Sidebar } from '@/components/sidebar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { auth } from '@/lib/lucia';
import { trpc } from '@/utils/trpc';
import { Separator } from '@/components/ui/separator';
import { User } from 'lucia-auth';
import { HomeIcon, PenTool, LayoutGrid, ImageIcon } from 'lucide-react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Roles } from '@prisma/client';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import React from 'react';
import DashboardLayout from '@/components/dashboard-layout';

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ user: User }>> => {
	const authRequest = auth.handleRequest(context.req, context.res, 'DEV');
	const { user } = await authRequest.validateUser();
	if (!user)
		return {
			redirect: {
				destination: '/signin',
				permanent: false,
			},
		};

	return {
		props: {
			user,
		},
	};
};

function Projects() {
	const [open, setOpen] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<FormValues>();
	const { data: projects, refetch } = trpc.project.getAllProjects.useQuery();
	const { mutateAsync: createProject } =
		trpc.project.createProject.useMutation();
	const onSubmit = async (data: FormValues) => {
		console.log(data);
		await createProject(
			{ title: data.title, description: data.description },
			{
				onSuccess: (d) => {
					console.log(d);
					setOpen(false);
					reset();
					refetch();
				},
			}
		);
	};

	return (
		<div className='mt-6 mx-2 w-full'>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger className={buttonVariants({ variant: 'default' })}>
					Create Project
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Enter Your Project Details</DialogTitle>
						<DialogDescription>
							<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
								<div className='space-y-1'>
									<label htmlFor='title'>Title</label>
									<Input
										id='title'
										{...register('title', {
											required: {
												message: 'Title is required',
												value: true,
											},
										})}
									/>
								</div>
								<div className='space-y-1'>
									<label htmlFor='description'>Description</label>
									<Textarea
										id='description'
										{...register('description', {
											required: {
												message: 'Description is required',
												value: true,
											},
										})}
									/>
								</div>
								<div>{errors.root?.message}</div>
								<Button type='submit'>Create Project</Button>
							</form>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<div className='py-2'>
				<ScrollArea>
					{projects?.map((project) => (
						<Link href={'/dashboard/projects/' + project.id} key={project.id}>
							<Card className='my-2 bg-muted/60 hover:bg-muted cursor-pointer'>
								<CardHeader>
									<CardTitle>{project.title}</CardTitle>
								</CardHeader>
								<CardContent className='flex justify-between'>
									<div>{project.description}</div>
									<Status role={project.members[0].role} />
								</CardContent>
							</Card>
						</Link>
					))}
				</ScrollArea>
			</div>
		</div>
	);
}

export default Projects;

Projects.getLayout = function getLayout(page: JSX.Element) {
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>

			<DashboardLayout>{page}</DashboardLayout>
		</>
	);
};

type FormValues = {
	title: string;
	description: string;
};

function Status({ role }: { role: Roles }) {
	return (
		<div
			className={cn(
				role === 'ADMIN' && 'bg-red-500',
				role === 'MODERATOR' && 'bg-green-500',
				role === 'USER' && 'bg-blue-500',
				'w-20 rounded-full text-center text-muted p-1'
			)}>
			{role}
		</div>
	);
}
