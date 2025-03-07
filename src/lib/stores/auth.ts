import { writable } from 'svelte/store';

interface User {
    id: string;
    email: string;
    name: string;
}

export const user = writable<User | null>(null);
