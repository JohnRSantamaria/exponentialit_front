'use client';

import { useUserStore } from '@/stores/auth/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function PublicRoute({ children }: { children: React.ReactNode }) {
	const isAuthenticated = useUserStore((s) => s.isAuthenticated);
	const router = useRouter();
	console.log(`isAuthenticated : ${isAuthenticated}`);
	useEffect(() => {
		if (isAuthenticated) {
			router.replace('/');
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated) return null;

	return <>{children}</>;
}
