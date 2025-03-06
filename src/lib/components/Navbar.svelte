<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let isMobile = false;
	let isMenuOpen = false;
	let activeDropdown: number | null = null;
	let scrolled = false;

	export let links = [
		{ href: '/', text: 'HOME' },
		{ href: '/about', text: 'ABOUT' },
		{ href: '/services', text: 'SERVICES' },
		{ href: '/contact-us', text: 'CONTACT' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleDropdown(index: number) {
		if (isMobile) {
			activeDropdown = activeDropdown === index ? null : index;
		}
	}

	function checkScroll() {
		scrolled = window.scrollY > 30;
	}

	function checkMobile() {
		isMobile = window.innerWidth <= 768;
	}

	onMount(() => {
		checkMobile();
		checkScroll();
		window.addEventListener('resize', checkMobile);
		window.addEventListener('scroll', checkScroll);

		return () => {
			window.removeEventListener('resize', checkMobile);
			window.removeEventListener('scroll', checkScroll);
		};
	});
</script>

<nav
	class={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white py-3 shadow-lg' : 'bg-transparent py-5'}`}
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6">
		<div class="flex items-center" data-aos="fade-right" data-aos-once="true">
			<a href="/" class="flex items-center">
				<img
					src="src/lib/assets/black-trans.png"
					alt="PocketRx"
					class="h-12 w-auto transition-transform hover:scale-105"
				/>
			</a>
		</div>

		<!-- Mobile Menu Toggle -->
		{#if isMobile}
			<button
				on:click={toggleMenu}
				class={`z-50 focus:outline-none ${scrolled || isMenuOpen ? 'text-[#00203F]' : 'text-[#00203F]'}`}
				aria-label="Toggle Menu"
				data-aos="fade-left"
				data-aos-once="true"
			>
				<div class="relative h-6 w-8">
					<span
						class={`absolute top-0 left-0 block h-0.5 w-8 transform transition-all duration-300 ${isMenuOpen ? 'translate-y-2.5 rotate-45 bg-[#00203F]' : 'bg-current'}`}
					></span>
					<span
						class={`absolute top-2.5 left-0 block h-0.5 w-8 transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'bg-current'}`}
					></span>
					<span
						class={`absolute top-5 left-0 block h-0.5 w-8 transform transition-all duration-300 ${isMenuOpen ? '-translate-y-2.5 -rotate-45 bg-[#00203F]' : 'bg-current'}`}
					></span>
				</div>
			</button>
		{/if}

		<!-- Desktop Menu -->
		{#if !isMobile}
			<div class="flex space-x-8" data-aos="fade-left" data-aos-once="true">
				{#each links as link, i}
					<a
						href={link.href}
						class={`relative text-lg font-medium transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#00203F] after:transition-all after:duration-300 hover:text-[#00203F] hover:after:w-full ${
							$page.url.pathname === link.href
								? 'text-[#00203F] after:w-full'
								: scrolled
									? 'text-[#00203F]'
									: 'text-[#00203F]'
						}`}
					>
						{link.text}
					</a>
				{/each}
				<a
					href="/contact-us"
					class="rounded-full bg-[#00203F] px-6 py-2 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
				>
					Get App
				</a>
			</div>
		{/if}

		<!-- Mobile Menu -->
		{#if isMobile && isMenuOpen}
			<div
				transition:fade={{ duration: 200 }}
				class="fixed inset-0 z-40 bg-white/90 backdrop-blur-md"
			>
				<div class="flex h-full items-center justify-center">
					<div class="flex flex-col items-center justify-center space-y-8 py-16">
						{#each links as link, i}
							<a
								href={link.href}
								class={`text-2xl font-medium text-[#00203F] ${$page.url.pathname === link.href ? 'text-[#00203F]' : ''}`}
								transition:fly={{ y: 20, delay: 100 * i, duration: 300, easing: quintOut }}
								on:click={toggleMenu}
							>
								{link.text}
							</a>
						{/each}
						<a
							href="/contact-us"
							class="mt-4 rounded-full bg-[#00203F] px-8 py-3 text-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
							transition:fly={{ y: 20, delay: 100 * links.length, duration: 300, easing: quintOut }}
							on:click={toggleMenu}
						>
							Get App
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>

<div class={`h-${scrolled ? '20' : '28'}`}></div>

<style>
	/* Animations for menu items */
	a {
		transition: all 0.3s ease;
	}
</style>
