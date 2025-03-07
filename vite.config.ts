import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@emailjs/browser']
	},
	build: {
		rollupOptions: {
			external: ['@emailjs/browser'],
			output: {
				globals: {
					'@emailjs/browser': 'emailjs'
				}
			}
		}
	}
});
