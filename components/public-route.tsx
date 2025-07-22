'use client';

import { useUserStore } from '@/stores/auth/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { SessionLoader } from './loadings/loader';

export function PublicRoute({ children }: { children: React.ReactNode }) {
	const user_id = useUserStore((state) => state.user_id);
	const loading = useUserStore((state) => state.loading);
	const router = useRouter();
	const hasRedirected = useRef(false);

	useEffect(() => {
		if (!loading && user_id && !hasRedirected.current) {
			hasRedirected.current = true;
			router.replace('/');
		}
	}, [user_id, loading, router]);

	if (loading) return <SessionLoader />;

	if (user_id) return null;

	return <>{children}</>;
}
