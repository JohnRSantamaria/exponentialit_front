'use client';

import LogoutButton from '@/components/logout-button';
import { ProtectedRoute } from '@/components/protected-route';
import { useUserStore } from '@/stores/auth/auth-store';

export default function Home() {
	const user_id = useUserStore((state) => state.user_id);
	const accounts = useUserStore((state) => state.accounts);

	return (
		<ProtectedRoute>
			<div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
				<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
					<h1>Welcome to the App : {user_id}</h1>
					{accounts.map((account, idx) => (
						<div key={account.account_name ?? idx}>{JSON.stringify(account)}</div>
					))}
					<LogoutButton />
				</main>
				<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
			</div>
		</ProtectedRoute>
	);
}
