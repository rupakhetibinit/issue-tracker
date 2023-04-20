import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

const links = ['Home', 'About', 'Sign Up', 'Sign In'];

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col bg-purple-800 py-2'>
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
			<div className='flex flex-col'>
				<span>The Best Issue Tracker on the planet</span>
			</div>
		</main>
	);
}
