'use client';
import React from 'react';

import { useUserStore } from '@/stores/auth/auth-store';
import { useAutoLogin } from '@/hooks/use-auto-login';

import { SessionLoader } from './loadings/loader';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const user_id = useUserStore((state) => state.user_id);
	const loading = useUserStore((state) => state.loading);

	useAutoLogin();

	if (loading) {
		return <SessionLoader />;
	}

	if (!user_id) {
		return null;
	}

	return <>{children}</>;
}
