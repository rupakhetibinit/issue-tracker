type Props = {
	username: string;
};

function UserActions({ username }: Props) {
	return (
		<div className='w-full flex justify-end'>
			<h1>{username}</h1>
		</div>
	);
}

export default UserActions;
