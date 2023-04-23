import {
	LayoutGrid,
	Library,
	ListMusic,
	Mic2,
	Music,
	Music2,
	PlayCircle,
	HomeIcon,
	Radio,
	User,
	Mail,
	ImageIcon,
	LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Url } from 'url';
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
							<>
								<Link
									key={link.path + link.name}
									className={cn(
										buttonVariants({
											variant: route === link.path ? 'secondary' : 'ghost',
											size: 'sm',
										}),
										'w-full justify-start'
									)}
									href={link.path}>
									<link.icon className='mr-2 h-4 w-4' />
									{link.name}
								</Link>
							</>
						))}
					</div>
				</div>
				<div className='px-4 py-2'>
					<h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
						Library
					</h2>
					<div className='space-y-1'>
						<Button variant='ghost' size='sm' className='w-full justify-start'>
							<ListMusic className='mr-2 h-4 w-4' />
							Playlists
						</Button>
						<Button variant='ghost' size='sm' className='w-full justify-start'>
							<Music2 className='mr-2 h-4 w-4' />
							Songs
						</Button>
						<Button variant='ghost' size='sm' className='w-full justify-start'>
							<User className='mr-2 h-4 w-4' />
							Made for You
						</Button>
						<Button variant='ghost' size='sm' className='w-full justify-start'>
							<Mic2 className='mr-2 h-4 w-4' />
							Artists
						</Button>
						<Button variant='ghost' size='sm' className='w-full justify-start'>
							<Library className='mr-2 h-4 w-4' />
							Albums
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
