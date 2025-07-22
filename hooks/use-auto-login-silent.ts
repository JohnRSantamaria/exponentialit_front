import { useUserStore } from '@/stores/auth/auth-store';
import { useEffect } from 'react';

export function useAutoLoginSilent() {
	const setUserData = useUserStore((s) => s.setUserData);
	const isAuthenticated = useUserStore((s) => s.isAuthenticated);
	const user_id = useUserStore((s) => s.user_id);

	useEffect(() => {
		if (user_id || isAuthenticated) return;

		const fetchUser = async () => {
			try {
				const res = await fetch('http://127.0.0.1:8000/auth/me/', {
					method: 'GET',
					credentials: 'include',
				});
				if (!res.ok) throw new Error();
				const data = await res.json();
				setUserData(data.user_id, data.accounts);
			} catch {
				// No hacer nada visible
			}
		};

		fetchUser();
	}, [setUserData, user_id, isAuthenticated]);
}
