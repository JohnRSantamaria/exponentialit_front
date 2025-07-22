'use client';

import { useUserStore } from '@/stores/auth/auth-store';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useFetchWithAuth() {
	const router = useRouter();

	const wrappedFetch = async (url: string, options: RequestInit = {}, retry = true): Promise<Response> => {
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
				return wrappedFetch(url, options, false);
			} else {
				useUserStore.getState().resetUser();
				toast.error('Sesión expirada');
				router.push('/login');
			}
		}

		return res;
	};

	return wrappedFetch;
}
