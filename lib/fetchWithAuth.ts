import { logout } from '@/lib/auth/logout';

export async function fetchWithAuth(url: string, options: RequestInit = {}, retry = true): Promise<Response> {
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
			return fetchWithAuth(url, options, false);
		} else {
			logout();
		}
	}

	return res;
}
