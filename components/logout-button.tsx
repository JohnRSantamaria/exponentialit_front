'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth/logout';

const LogoutButton = () => {
	const router = useRouter();

	return (
		<button
			onClick={() => logout(router)}
			className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
		>
			Cerrar sesión
		</button>
	);
};

export default LogoutButton;
