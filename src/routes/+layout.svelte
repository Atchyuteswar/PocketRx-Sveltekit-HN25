<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AOS from 'aos';
	import 'aos/dist/aos.css';

	onMount(() => {
		AOS.init({
			duration: 800,
			once: false,
			offset: 100,
			easing: 'ease-out-cubic',
			delay: 100
		});
	});
</script>

<svelte:head>
	<title>PocketRx - Understand Your Health Reports</title>
	<meta
		name="description"
		content="Making health reports understandable for everyone. Your health, simplified."
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col overflow-x-hidden">
	<Navbar />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		scroll-padding-top: 5rem;
	}

	:global(body) {
		font-family: 'Inter', sans-serif;
		overflow-x: hidden;
		background-color: #fff;
	}
</style>
