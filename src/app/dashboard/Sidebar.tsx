'use client';
import {
	HomeIcon,
	ImageIcon,
	LayoutGrid,
	LucideIcon,
	PenTool,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export type SidebarLinks = {
	name: string;
	path: string;
	icon: LucideIcon;
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
const links: SidebarLinks[] = [
	{
		name: 'Home',
		path: '/dashboard',
		icon: HomeIcon,
	},
	{ name: 'Projects', path: '/dashboard/projects', icon: PenTool },
	{ name: 'Issues', path: '/dashboard/issues', icon: LayoutGrid },
	{ name: 'Excalidraw', path: '/dashboard/excalidraw', icon: ImageIcon },
];
export function Sidebar({ className }: SidebarProps) {
	const route = usePathname();
	console.log('here', route);

	return (
		<div className={cn('pb-12 fixed max-w-max', className)}>
			<div className='space-y-4 py-4'>
				<div className='px-4 py-2'>
					<h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
						Issue Tracker
					</h2>
					<div className='space-y-1'>
						{links.map((link) => (
							<Link
								key={link.path}
								className={cn(
									buttonVariants({
										variant: route === link.path ? 'default' : 'ghost',
										size: 'sm',
									}),
									'justify-start flex-row flex w-44'
								)}
								href={link.path}>
								<link.icon className='mr-2 h-4 w-4' />
								{link.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
