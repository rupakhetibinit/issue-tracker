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
import { ChangeEvent, useMemo, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FormValues = RouterInputs['issue']['createIssue'];

function Project() {
	const { query } = useRouter();
	const id = query['id'];
	const { data: project } = trpc.project.getProjectById.useQuery({
		id: id as string,
	});

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

	const utils = trpc.useContext();
	const { mutateAsync: createIssue } = trpc.issue.createIssue.useMutation();

	const onSubmit = async (data: FormValues) => {
		await createIssue(
			{ ...data, projectId },
			{
				onSuccess: () => {
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
							<Button type='submit'>Create Issue</Button>
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

const issues = [
	{ type: 'EXTREME', color: 'bg-red-500' },
	{ type: 'HIGH', color: 'bg-orange-500' },
	{ type: 'MEDIUM', color: 'bg-yellow-500' },
	{ type: 'LOW', color: 'bg-green-500' },
] as const;
function Issue({ issue }: IssueProps) {
	const [open, setOpen] = useState(false);
	const color = useMemo(
		() => issues.filter((i) => i.type === issue.priority)[0],
		[issue]
	);
	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div className='py-2'>
						<ScrollArea>
							<Card className='relative bg-gray-200 hover:bg-gray-300 cursor-pointer'>
								<div
									className={cn(
										'absolute top-0 right-0',
										color.color,
										'text-white px-4 py-2 my-2 mx-2 rounded-md'
									)}>
									{color.type}
								</div>
								<CardHeader>
									<CardTitle className='font-bold text-xl tracking-wider'>
										{issue.title}
									</CardTitle>
								</CardHeader>
								<CardContent className='flex justify-between'>
									<div>{issue.content}</div>
								</CardContent>
							</Card>
						</ScrollArea>
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className=' text-xl font-bold'>
							{issue.title}
						</DialogTitle>
						<DialogDescription>{issue.content}</DialogDescription>
					</DialogHeader>
					<div className='space-y-4'>
						<div
							className={cn(
								'absolute top-0 right-8',
								color.color,
								'text-white px-4 py-2 my-2 mx-2 rounded-md'
							)}>
							{issue.priority}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

type MembersComponentProps = {
	member: RouterOutputs['project']['getMembersOfProject'][number];
};

function MembersComponent() {
	const router = useRouter();
	const projectId = router.query['id'] as string;
	const { data: members } = trpc.project.getMembersOfProject.useQuery({
		projectId: projectId,
	});

	return (
		<>
			<AddMemberDialog />
			{members?.map((member) => (
				<Member key={member.authUserId} member={member} />
			))}
		</>
	);
}

function Member({ member }: MembersComponentProps) {
	const router = useRouter();
	const projectId = router.query['id'] as string;
	const { mutateAsync } = trpc.project.deleteMemberInProject.useMutation();
	const utils = trpc.useContext();
	return (
		<div className='px-4 py-2 text-white my-2 rounded-md bg-gray-500'>
			<div className='font-bold text-xl tracking-wider'>
				Username : {member.user.username}
			</div>
			<div>Role : {member.role}</div>
			<button
				onClick={async () => {
					await mutateAsync({
						projectId: projectId,
						authUserId: member.authUserId,
					});
					await utils.project.getMembersOfProject.invalidate();
				}}>
				Delete
			</button>
		</div>
	);
}

function SettingsComponent() {
	return <div>Settings component</div>;
}

type IssuePopupDiaglogProps = {
	issue: RouterOutputs['issue']['getAllIssueByProject'][number];
};

export type MembersType = 
	RouterOutputs['project']['getAllMembersExceptYourself'][number] & {
		role:"ADMIN"|"MODERATOR"|"USER"
	}


function AddMemberDialog() {
	const router = useRouter();
	const projectId = router.query['id'] as string;
	const [open, setOpen] = useState(false);
	const utils = trpc.useContext();

	const { mutateAsync: addMembers } =
		trpc.project.createMemberInProject.useMutation();
	const handleSubmit = async () => {
		// e.preventDefault();
		// setOpen(false);
		await addMembers({
			projectId: projectId,
			userList: userList,
		});
		await utils.project.getMembersOfProject.invalidate();

		setOpen(false);
	};

	const [userList, setUserList] = useState<MembersType[]>([]);

	const { data: membersToAdd } =
		trpc.project.getAllMembersExceptYourself.useQuery(
			{ projectId: projectId },
			{
				onSuccess(data) {
					console.log(data);
				},
			}
		);

		const handleRoleChange=(e:ChangeEvent<HTMLSelectElement>,username:string)=>{
			const users = [...userList];
			const user = userList.find(user=>user.username===username);
			if(!user) return;

			user.role = e.target.value as "USER"|"MODERATOR";
			setUserList(users)
		}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className={buttonVariants({ variant: 'default' })}>
				Add Member
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add a member to the project</DialogTitle>
					<DialogDescription asChild>
						<div className='space-y-4 '>
							<div className='space-y-1 flex flex-col'>
								{membersToAdd?.map((member) => (
									<div
										key={member.username}
										className='flex flex-row justify-around'>
										<div className='text-black text-xl' key={member.username}>
											{member.username}
										</div>
										<button
											type='button'
											onClick={() => {
												const userlist = Array.from(
													new Set(userList.concat([{...member,role:"USER"}]))
												);
												setUserList(userlist);
											}}>
											Add {member.username} to your project
										</button>
									</div>
								))}

								<div className='text-base font-semibold text-black'>
									Added Members
								</div>
								{userList.map((user) => (
									<div
										className='flex px-4 items-center space-x-5'
										key={user.username}>
										<div className='text-sm font-semibold text-black'>
											{user.username}
										</div>
										<select value={user.role} onChange={e=>handleRoleChange(e,user.username)}>
											<option value="MODERATOR">MODERATOR</option>
											<option value="USER">USER</option>
										</select>
										<button
											className='text-sm font-semibold text-black'
											onClick={() => {
												let users = [...userList].filter(
													(u) => user.username !== u.username
												);

												setUserList(users);
											}}>
											X
										</button>
									</div>
								))}
							</div>

							<Button type='button' onClick={handleSubmit}>
								Confirm
							</Button>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
