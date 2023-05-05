import Excalidraw from './Excalidraw';

export const metadata = {
	title: 'Where am I',
	description: 'Testing more app directory',
};

export default function Page() {
	return (
		<div className='mt-6 mx-2 w-full'>
			<Excalidraw />
		</div>
	);
}
