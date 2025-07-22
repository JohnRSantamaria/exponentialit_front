import { useUserStore } from '@/stores/auth/auth-store';
import { toast } from 'sonner';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logout = async (router: AppRouterInstance) => {
	try {
		await fetch('http://127.0.0.1:8000/auth/logout/', {
			method: 'POST',
			credentials: 'include',
		});
		toast.success('Sesión finalizada');
	} catch (err) {
		console.error('Error cerrando sesión:', err);
		toast.error('Error cerrando sesión');
	}

	useUserStore.getState().resetUser();
	router.push('/login');
};
