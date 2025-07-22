'use client';
import React from 'react';
import { logout } from '@/lib/auth/logout';

const LogoutButton = () => (
	<button
		onClick={logout}
		className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
	>
		Cerrar sesión
	</button>
);

export default LogoutButton;
