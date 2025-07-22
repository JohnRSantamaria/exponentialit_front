'use client';

import { useUserStore } from '@/stores/auth/auth-store';
import { useAutoLoginSilent } from '@/hooks/use-auto-login-silent';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const isAuthenticated = useUserStore((s) => s.isAuthenticated);
	const router = useRouter();
	useAutoLoginSilent();

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/login');
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) return null;

	return <>{children}</>;
}
