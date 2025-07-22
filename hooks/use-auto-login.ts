// hooks/use-auto-login.ts
'use client';

import { useEffect } from 'react';
import { fetchWithAuth } from '@/lib/fetchWithAuth';
import { useUserStore } from '@/stores/auth/auth-store';

export function useAutoLogin(redirectIfFail = true) {
	const setUserData = useUserStore((s) => s.setUserData);
	const setLoading = useUserStore((s) => s.setLoading);
	const user_id = useUserStore((s) => s.user_id);

	useEffect(() => {
		if (user_id) return;

		const fetchUser = async () => {
			setLoading(true);
			try {
				const res = await fetchWithAuth('http://127.0.0.1:8000/auth/me/');
				if (!res.ok) throw new Error('No autorizado');
				const data = await res.json();
				setUserData(data.user_id, data.accounts);
				console.log('✅ Usuario restaurado automáticamente');
			} catch (err) {
				console.log('⚠️ No se pudo restaurar sesión:', err);
				if (redirectIfFail) {
					window.location.href = '/login';
				}
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [setUserData, setLoading, user_id, redirectIfFail]);
}
