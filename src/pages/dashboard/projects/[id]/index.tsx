import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RouterInputs, RouterOutputs, trpc } from '@/utils/trpc';
import DashboardLayout from '@/components/dashboard-layout';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type FormValues = RouterInputs['issue']['createIssue'];

function Project() {
	// const [id, setId] = useState<string>();
	// nextjs router.query issue fix
	const { query } = useRouter();
	const id = query['id'];
	const { data: project } = trpc.project.getProjectById.useQuery({
		id: id as string,
	});
	//@ts-ignore

	// if (!router.isReady) return null;
	// if (router.isReady) refetch();

	return (
		<div className='mt-6 ml-2 w-full'>
			<div className='w-full h-full bg-muted px-4 py-2'>
				{!project && <div>The requested resource doesn&apos;t exist</div>}
				{project && (
					<>
						<div className='flex justify-between'>
							<div className=''>
								<h1 className='font-bold tracking-wide text-2xl'>
									{project.title}
								</h1>
								<p className='text-sm '>{project.description}</p>
							</div>
							<span className='flex flex-row'>
								<p>{project._count.members} Members</p>
							</span>
						</div>
						<TabsComponent />
					</>
				)}
			</div>
		</div>
	);
}

export default Project;
Project.getLayout = function getLayout(page: JSX.Element) {
	return (
		<>
			<Head>
				<title>Dashboard | Issue Tracker</title>
			</Head>

			<DashboardLayout>{page}</DashboardLayout>
		</>
	);
};

function CreateIssueDialog() {
	const router = useRouter();
	const projectId = router.query['id'] as string;
	const [open, setOpen] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		register,
		reset,
	} = useForm<FormValues>();

	const { mutateAsync: createIssue } = trpc.issue.createIssue.useMutation();

	const onSubmit = async (data: FormValues) => {
		const utils = trpc.useContext();
		await createIssue(
			{ ...data, projectId },
			{
				onSuccess: (d) => {
					setOpen(false);
					reset();
					utils.invalidate();
				},
			}
		);
		console.log(data);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={buttonVariants({ variant: 'default' })}>
				Create Issue
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add an Issue</DialogTitle>
					<DialogDescription asChild>
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
								<label htmlFor='content'>Description</label>
								<Textarea
									id='content'
									{...register('content', {
										required: {
											message: 'Description is required',
											value: true,
										},
									})}
								/>
							</div>
							<div className='space-y-1'>
								<label htmlFor='priority'>Priority</label>

								<select
									className='flex w-32 border rounded-sm px-4 py-2'
									{...register('priority', {
										required: {
											value: true,
											message: 'Priority is required',
										},
									})}>
									<option className='w-32 px-2 py-1 my-0.5' value='EXTREME'>
										Extreme
									</option>
									<option className='w-32 px-2 py-1 my-0.5' value='HIGH'>
										High
									</option>
									<option className='w-32 px-2 py-1 my-0.5' value='MEDIUM'>
										Medium
									</option>
									<option className='w-32 px-2 py-1 my-0.5' value='LOW'>
										Low
									</option>
								</select>
							</div>

							<div>{errors.root?.message}</div>
							<Button type='submit'>Create Project</Button>
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
const TabsComponent = () => {
	return (
		<Tabs defaultValue='issues'>
			<TabsList>
				<TabsTrigger value='issues'>Issues</TabsTrigger>
				<TabsTrigger value='members'>Members</TabsTrigger>
				<TabsTrigger value='settings'>Settings</TabsTrigger>
			</TabsList>
			<TabsContent value='issues'>
				<IssueComponent />
			</TabsContent>
			<TabsContent value='members'>
				<MembersComponent />
			</TabsContent>
			<TabsContent value='settings'>
				<SettingsComponent />
			</TabsContent>
		</Tabs>
	);
};

function IssueComponent() {
	const router = useRouter();
	const projectId = router.query['id'] as string;
	const { data: issues } = trpc.issue.getAllIssueByProject.useQuery({
		projectId: projectId,
	});
	console.log(issues);
	return (
		<div>
			<CreateIssueDialog />
			{issues?.map((issue) => (
				<Issue key={issue.id} issue={issue} />
			))}
		</div>
	);
}

type IssueProps = {
	issue: RouterOutputs['issue']['getAllIssueByProject'][number];
};

function Issue({ issue }: IssueProps) {
	return (
		<div className='px-4 py-2 bg-gray-500 text-white my-2 rounded-md '>
			<div className='font-bold text-xl tracking-wider'>{issue.title}</div>
			<div>Priority : {issue.priority}</div>
			{/* <div>Content: {issue.content}</div> */}
		</div>
	);
}

function MembersComponent() {
	return <div>Members component</div>;
}

function SettingsComponent() {
	return <div>Settings component</div>;
}
