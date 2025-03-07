import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthStore {
    isAuthenticated: boolean;
    user: any | null;
}

const createAuthStore = () => {
    const { subscribe, set, update } = writable<AuthStore>({
        isAuthenticated: false,
        user: null
    });

    return {
        subscribe,
        login: async (userData: any) => {
            set({ isAuthenticated: true, user: userData });
            await goto('/dashboard');
        },
        logout: () => {
            set({ isAuthenticated: false, user: null });
            goto('/');
        }
    };
};

export const auth = createAuthStore();
export const user = writable<User | null>(null);
