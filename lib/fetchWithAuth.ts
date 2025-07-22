// lib/fetchWithAuth.ts
import { useUserStore } from '@/stores/auth/auth-store';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'sonner';

export async function fetchWithAuth(
	url: string,
	options: RequestInit = {},
	retry = true,
	router?: AppRouterInstance
): Promise<Response> {
	const res = await fetch(url, {
		...options,
		credentials: 'include',
	});

	if (res.status === 401 && retry) {
		const refreshRes = await fetch('http://127.0.0.1:8000/auth/refresh/', {
			method: 'POST',
			credentials: 'include',
		});

		if (refreshRes.ok) {
			return fetchWithAuth(url, options, false, router);
		} else {
			useUserStore.getState().resetUser();
			toast.error('Sesión expirada');
			if (router) router.push('/login');
		}
	}

	return res;
}
