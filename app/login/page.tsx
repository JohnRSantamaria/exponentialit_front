import { Login } from '@/components/login';
import { PublicRoute } from '@/components/public-route';

export default function Page() {
	return (
		<PublicRoute>
			<div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
				<div className='w-full max-w-sm'>
					<Login />
				</div>
			</div>
		</PublicRoute>
	);
}
