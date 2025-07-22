'use client';

import { useEffect } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { useUserStore } from '@/stores/auth/auth-store';
import { useRouter } from 'next/navigation';

export function useAutoLogin(redirectIfFail = true) {
	const setUserData = useUserStore((s) => s.setUserData);
	const setLoading = useUserStore((s) => s.setLoading);
	const user_id = useUserStore((s) => s.user_id);
	const router = useRouter();

	useEffect(() => {
		if (user_id) return;

		const fetchUser = async () => {
			setLoading(true);
			try {
				const res = await fetchWithAuth('http://127.0.0.1:8000/auth/me/', {}, true, router);
				if (!res.ok) throw new Error('No autorizado');
				const data = await res.json();
				setUserData(data.user_id, data.accounts);
			} catch {
				if (redirectIfFail) {
					router.push('/login');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [setUserData, setLoading, user_id, redirectIfFail, router]);
}
