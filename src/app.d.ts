/// <reference types="@sveltejs/kit" />

declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				email: string;
			} | null;
		}
		interface Platform { }
		interface Session { }
		interface Stuff { }
	}
}

interface ImportMetaEnv {
	PUBLIC_EMAILJS_PUBLIC_KEY: string;
	PUBLIC_EMAILJS_TEMPLATE_ID: string;
	PUBLIC_EMAILJS_SERVICE_ID: string;
}

declare module 'aos';

declare module "$env/static/private" {
	export const JWT_SECRET: string;
	export const DATABASE_URL: string;
}

export { };
