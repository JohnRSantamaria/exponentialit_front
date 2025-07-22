import { useUserStore } from '@/stores/auth/auth-store';

export const logout = async () => {
	try {
		await fetch('http://127.0.0.1:8000/auth/logout/', {
			method: 'POST',
			credentials: 'include',
		});
	} catch (err) {
		console.error('Error cerrando sesión:', err);
	}

	useUserStore.getState().resetUser();
	window.location.href = '/login';
};
