import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            // Use Edge runtime for better performance
            runtime: 'edge',
            // Include all paths in the lambda function
            regions: ['iad1'],
            // Ensure all routes are properly handled
            externals: []
        }),
        prerender: {
            handleHttpError: ({ path, referrer, message }) => {
                if (path === '/not-found') return;
                throw new Error(message);
            }
        },
        // Add trailingSlash configuration to handle URL formats consistently
        trailingSlash: 'never'
    },
    preprocess: vitePreprocess()
};

export default config;
