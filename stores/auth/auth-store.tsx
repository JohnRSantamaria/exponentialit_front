import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Account {
	account_id: number;
	account_name: string;
	account_tax_id: string;
}

interface UserState {
	user_id: number | null;
	accounts: Account[];
	loading: boolean;
	isAuthenticated: boolean;
	setIsAuthenticated: (state: boolean) => void;
	setUserData: (user_id: number, accounts: Account[]) => void;
	resetUser: () => void;
	setLoading: (value: boolean) => void;
}

const myMiddlewares = (
	f: StateCreator<UserState, [], [], UserState>
): StateCreator<UserState, [], [['zustand/devtools', never], ['zustand/persist', UserState]], UserState> =>
	devtools(
		persist(f, {
			name: 'userStore',
		})
	);

export const useUserStore = create<UserState>()(
	myMiddlewares((set) => ({
		user_id: null,
		accounts: [],
		loading: true,
		isAuthenticated: false,
		setIsAuthenticated: (state) => {
			set({
				isAuthenticated: state,
			});
		},
		setUserData: (user_id, accounts) =>
			set({
				user_id,
				accounts,
				isAuthenticated: true,
				loading: false,
			}),
		resetUser: () =>
			set({
				user_id: null,
				accounts: [],
				isAuthenticated: false,
				loading: false,
			}),
		setLoading: (value) => set({ loading: value }),
	}))
);
