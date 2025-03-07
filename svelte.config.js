import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            runtime: 'nodejs18.x'
        }),
        prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                if (path === '/not-found') return;
                throw new Error(message);
            }
        }
    },
    preprocess: vitePreprocess()
};

export default config;
