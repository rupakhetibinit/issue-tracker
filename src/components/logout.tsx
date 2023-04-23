import { Button, ButtonProps } from '@/components/ui/button';
import { useRouter } from 'next/router';

function Logout(
	props: React.ForwardRefExoticComponent<
		ButtonProps & React.RefAttributes<HTMLButtonElement>
	>
) {
	const router = useRouter();

	const handleClick = async () => {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
			});
			if (response.redirected) {
				return router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Button {...props} onClick={handleClick}>
			Logout
		</Button>
	);
}

export default Logout;
