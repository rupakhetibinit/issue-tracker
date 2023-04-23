import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type SidebarLinks = {
	name: string;
	path: string;
	icon: LucideIcon;
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	links: SidebarLinks[];
}

export function Sidebar({ className, links }: SidebarProps) {
	const { route } = useRouter();

	return (
		<div className={cn('pb-12', className)}>
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
									'w-full justify-start'
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
