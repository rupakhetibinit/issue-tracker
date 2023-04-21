import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const links = ['Home', 'About', 'Sign Up', 'Sign In'];

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col py-2'>
			<header className='flex px-2 py-1 justify-between flex-row'>
				<div className='font-bold tracking-wide'>Issue Tracker</div>
				<nav>
					<ul>
						{links.map((link) => (
							<Link
								className='mx-1 px-2 py-2 outline outline-white rounded-md outline-1 text-white hover:bg-white hover:text-purple-700'
								key={link}
								href={`/${link}`}>
								{link}
							</Link>
						))}
					</ul>
				</nav>
			</header>
			<div className='flex flex-row items-center justify-center'>
				<h1 className='py-14 text-[23vw] text-center sm:text-10xl leading-none select-none tracking-tightest font-extrabold'>
					<span
						content='Issue.'
						className='animate-gradient-background-1 relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:text-center before:text-black'>
						<span className='animate-gradient-foreground-1 px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-1-start to-gradient-1-end'>
							Issue.
						</span>
					</span>
					<span
						data-content='Tracking.'
						className='relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:text-center before:text-black'>
						<span className='px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-2-start to-gradient-2-end'>
							Tracking.
						</span>
					</span>
					<span
						data-content='Simplified.'
						className='relative block before:content-[attr(data-content)] before:w-full before:z-0 before:block before:absolute before:top-0 before:bottom-0 before:left-0 before:text-center before:text-black'>
						<span className='px-2 text-transparent bg-clip-text bg-gradient-to-br from-gradient-3-start to-gradient-3-end'>
							Simplified.
						</span>
					</span>
				</h1>
			</div>
		</main>
	);
}
