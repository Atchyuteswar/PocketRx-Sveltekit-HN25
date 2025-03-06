<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Timeline, TimelineItem } from 'flowbite-svelte';
	import { CalendarWeekSolid } from 'flowbite-svelte-icons';

	let isIntersecting = false;
	let statsContainer: HTMLElement;

	onMount(() => {
		// Intersection Observer for stats counter animation
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !isIntersecting) {
				isIntersecting = true;
			}
		});

		if (statsContainer) {
			observer.observe(statsContainer);
		}

		return () => {
			if (statsContainer) observer.unobserve(statsContainer);
		};
	});

	// Statistics counter animation
	function animateCount(node: HTMLElement, { from, to, duration }: { from: number, to: number, duration: number }) {
		const start = performance.now();

		function update(time: number) {
			const elapsed = time - start;
			const progress = Math.min(elapsed / duration, 1);
			const value = Math.floor(from + (to - from) * progress);
			node.textContent = value.toLocaleString();

			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}

		requestAnimationFrame(update);
	}
</script>

<svelte:head>
	<title>PocketRx - Understand Your Health Reports</title>
</svelte:head>

<!-- Hero Section -->
<section
	class="relative overflow-hidden bg-gradient-to-b from-[#f5f9ff] via-white to-white pt-60 pb-24"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left">
			<div class="lg:w-1/2 lg:pr-8" data-aos="fade-right">
				<h1
					class="mb-6 text-4xl font-extrabold tracking-tight text-[#00203F] sm:text-5xl lg:text-6xl"
				>
					<span class="gradient-text">Understand</span> Your Health Reports with Ease
				</h1>
				<p class="mb-8 text-xl text-gray-700">
					Transform complex medical reports into simple, actionable insights. Get personalized
					health recommendations and take control of your well-being.
				</p>
				<div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
					<button class="btn-primary"> Download App </button>
					<a href="/services">
						<button class="btn-secondary"> Learn More </button>
					</a>
				</div>
			</div>
			<div class="mt-12 lg:mt-0 lg:w-1/2" data-aos="fade-up" data-aos-delay="200">
				<!-- Phone mockup with app screenshot -->
				<div class="relative mx-auto w-full max-w-md">
					<div class="relative">
						<!-- Phone frame -->
						<div class="relative z-10 mx-auto w-[280px]">
							<img src="/images/phone-mockup.png" alt="Phone mockup" class="w-full" />
						</div>

						<!-- App screenshot inside frame -->
						<div
							class="absolute top-[10%] left-1/2 z-0 h-[80%] w-[90%] -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-inner"
						>
							<img
								src="/images/app-screenshot.jpg"
								alt="App screenshot"
								class="h-full w-full object-cover"
							/>
						</div>

						<!-- Decorative elements -->
						<div
							class="absolute top-8 -right-8 h-20 w-20 rounded-full bg-[#ADEFD1]/40 blur-lg"
						></div>
						<div
							class="absolute bottom-12 -left-12 h-24 w-24 rounded-full bg-[#0080FF]/30 blur-xl"
						></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Background elements -->
	<div
		class="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"
		data-aos="zoom-in"
		data-aos-duration="1500"
	></div>
	<div
		class="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#0080FF]/5 blur-3xl"
		data-aos="zoom-in"
		data-aos-delay="300"
		data-aos-duration="1500"
	></div>
</section>

<!-- Features Section -->
<section class="section-padding bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				Key Features
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				Our app provides powerful tools to help you understand and manage your health information
				efficiently
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Feature 1 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="0"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF]/20 to-[#ADEFD1]/20 p-3"
				>
					<svg class="h-8 w-8 text-[#00203F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Advanced Report Analysis</h3>
				<p class="text-gray-600">
					Instant scanning and analysis of medical reports with advanced AI technology that
					processes complex medical data.
				</p>
			</div>
			<!-- Feature 2 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF]/20 to-[#ADEFD1]/20 p-3"
				>
					<svg class="h-8 w-8 text-[#00203F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Personalized Health Insights</h3>
				<p class="text-gray-600">
					Get customized explanations and recommendations based on your health data. Track your
					health metrics over time.
				</p>
			</div>

			<!-- Feature 3 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF]/20 to-[#ADEFD1]/20 p-3"
				>
					<svg class="h-8 w-8 text-[#00203F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Health History Tracking</h3>
				<p class="text-gray-600">
					Securely store and access your health records anytime. Track changes in your health
					parameters over time.
				</p>
			</div>

			<!-- Feature 4 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF]/20 to-[#ADEFD1]/20 p-3"
				>
					<svg class="h-8 w-8 text-[#00203F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Medical Dictionary</h3>
				<p class="text-gray-600">
					Look up medical terms and concepts with our comprehensive, user-friendly medical
					dictionary.
				</p>
			</div>

			<!-- Feature 5 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF]/20 to-[#ADEFD1]/20 p-3"
				>
					<svg class="h-8 w-8 text-[#00203F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Data Security</h3>
				<p class="text-gray-600">
					Bank-level encryption and security protocols ensure your sensitive health data remains
					private and protected.
				</p>
			</div>

			<!-- Feature 6 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="300"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#0080FF]/20 to-[#ADEFD1]/20 p-3"
				>
					<svg class="h-8 w-8 text-[#00203F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
						/>
					</svg>
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Doctor Consultation</h3>
				<p class="text-gray-600">
					Connect with healthcare professionals for virtual consultations and get expert advice on
					your health reports.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="section-padding bg-[#f9fdfb]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				How It Works
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				Understanding your health reports is now easier than ever with our simple 3-step process
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- Step 1 -->
			<div class="relative text-center" data-aos="fade-up" data-aos-delay="0">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00203F] to-[#0080FF] text-2xl font-bold text-white shadow-lg"
				>
					1
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Upload Your Report</h3>
				<p class="text-gray-600">
					Simply take a photo or upload your medical report through our secure and easy-to-use
					interface.
				</p>

				<!-- Connector line (visible on desktop) -->
				<div class="absolute top-10 right-0 hidden w-full translate-x-1/2 md:block">
					<div class="h-0.5 w-full bg-gradient-to-r from-[#FFFFFF00] to-transparent"></div>
				</div>
			</div>

			<!-- Step 2 -->
			<div class="relative text-center" data-aos="fade-up" data-aos-delay="100">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00203F] to-[#0080FF] text-2xl font-bold text-white shadow-lg"
				>
					2
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">AI Analysis</h3>
				<p class="text-gray-600">
					Our advanced AI technology analyzes your report and extracts important information within
					seconds.
				</p>

				<!-- Connector line (visible on desktop) -->
				<div class="absolute top-10 right-0 hidden w-full translate-x-1/2 md:block">
					<div class="h-0.5 w-full bg-gradient-to-r from-[#FFFFFF00] to-transparent"></div>
				</div>
			</div>

			<!-- Step 3 -->
			<div class="relative text-center" data-aos="fade-up" data-aos-delay="200">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00203F] to-[#0080FF] text-2xl font-bold text-white shadow-lg"
				>
					3
				</div>
				<h3 class="mb-3 text-xl font-semibold text-[#00203F]">Get Simple Results</h3>
				<p class="text-gray-600">
					Receive easy-to-understand explanations, personalized insights, and recommendations based
					on your results.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Statistics Section -->
<section class="section-padding bg-gradient-to-b from-white to-[#f5f9ff]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				PocketRx Impact
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				Helping users make sense of their health data and make informed decisions
			</p>
		</div>

		<div
			class="grid gap-8 md:grid-cols-4"
			bind:this={statsContainer}
			data-aos="fade-up"
			data-aos-delay="200"
		>
			<!-- Stat 1 -->
			<div class="text-center">
				<h3 class="mb-2 text-4xl font-bold text-[#00203F]">
					{#if isIntersecting}
						<span use:animateCount={{ from: 0, to: 100000, duration: 2000 }}></span>+
					{:else}
						0+
					{/if}
				</h3>
				<p class="text-lg text-gray-600">Users</p>
			</div>

			<!-- Stat 2 -->
			<div class="text-center">
				<h3 class="mb-2 text-4xl font-bold text-[#00203F]">
					{#if isIntersecting}
						<span use:animateCount={{ from: 0, to: 500000, duration: 2000 }}></span>+
					{:else}
						0+
					{/if}
				</h3>
				<p class="text-lg text-gray-600">Reports Analyzed</p>
			</div>

			<!-- Stat 3 -->
			<div class="text-center">
				<h3 class="mb-2 text-4xl font-bold text-[#00203F]">
					{#if isIntersecting}
						<span use:animateCount={{ from: 0, to: 95, duration: 2000 }}></span>%
					{:else}
						0%
					{/if}
				</h3>
				<p class="text-lg text-gray-600">Accuracy Rate</p>
			</div>

			<!-- Stat 4 -->
			<div class="text-center">
				<h3 class="mb-2 text-4xl font-bold text-[#00203F]">
					{#if isIntersecting}
						<span use:animateCount={{ from: 0, to: 24, duration: 2000 }}></span>/7
					{:else}
						0/7
					{/if}
				</h3>
				<p class="text-lg text-gray-600">Customer Support</p>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials -->
<section class="section-padding bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				What Our Users Say
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				Real stories from people who have transformed their healthcare experience with PocketRx
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- Testimonial 1 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="0"
			>
				<div class="mb-4 flex">
					{#each Array(5) as _, i}
						<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<p class="mb-6 text-gray-600 italic">
					"This app has been a game-changer for me. I've always struggled to understand my lab
					reports, but now I can easily track my health metrics and understand what they mean."
				</p>
				<div class="flex items-center">
					<div class="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
						<img src="/images/testimonial-1.jpg" alt="User" class="h-full w-full object-cover" />
					</div>
					<div>
						<h4 class="font-semibold text-[#00203F]">Sarah Johnson</h4>
						<p class="text-sm text-gray-500">Healthcare Professional</p>
					</div>
				</div>
			</div>

			<!-- Testimonial 2 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<div class="mb-4 flex">
					{#each Array(5) as _, i}
						<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<p class="mb-6 text-gray-600 italic">
					"As someone with a chronic condition, keeping track of all my lab results used to be
					overwhelming. PocketRx organizes everything and explains what changes in my results
					actually mean."
				</p>
				<div class="flex items-center">
					<div class="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
						<img src="/images/testimonial-2.jpg" alt="User" class="h-full w-full object-cover" />
					</div>
					<div>
						<h4 class="font-semibold text-[#00203F]">Michael Chen</h4>
						<p class="text-sm text-gray-500">Software Engineer</p>
					</div>
				</div>
			</div>

			<!-- Testimonial 3 -->
			<div
				class="card-hover rounded-xl bg-white p-6 shadow-lg"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<div class="mb-4 flex">
					{#each Array(5) as _, i}
						<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
							/>
						</svg>
					{/each}
				</div>
				<p class="mb-6 text-gray-600 italic">
					"I was constantly Googling medical terms from my reports and getting confused. PocketRx
					gives me clear explanations and helps me have better conversations with my doctor."
				</p>
				<div class="flex items-center">
					<div class="mr-4 h-12 w-12 overflow-hidden rounded-full bg-gray-200">
						<img src="/images/testimonial-3.jpg" alt="User" class="h-full w-full object-cover" />
					</div>
					<div>
						<h4 class="font-semibold text-[#00203F]">Emily Rodriguez</h4>
						<p class="text-sm text-gray-500">Teacher</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="relative overflow-hidden bg-gradient-to-r from-[#00203F] to-[#00305F] text-white">
	<div class="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
		<div class="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row">
			<div class="max-w-2xl text-center lg:text-left" data-aos="fade-right">
				<p class="mb-6 text-3xl text-white font-bold sm:text-4xl">Ready to Understand Your Health Better?</p>
				<p class="mb-8 text-xl opacity-90">
					Download PocketRx today and start making sense of your health reports. Take control of
					your health journey with clear, personalized insights.
				</p>
				<div
					class="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:items-start"
				>
					<button
						class="flex items-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-[#00203F] transition-all hover:scale-105 hover:bg-[#ADEFD1] hover:shadow-lg"
					>
						<svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.231-1.725-.753-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"
							/>
						</svg>
						App Store
					</button>
					<button
						class="flex items-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-[#00203F] transition-all hover:scale-105 hover:bg-[#ADEFD1] hover:shadow-lg"
					>
						<svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m7 12.5l.92-2.5L15.25 10l-2.75-.39L11.5 7l-1 2.61L7.75 10l2.33 2L9.5 14.5l2.5-1.64 2.5 1.64Z"
							/>
						</svg>
						Play Store
					</button>
				</div>
			</div>
			<div class="max-w-xs lg:max-w-sm" data-aos="fade-up">
				<div class="relative">
					<!-- Phone mockup -->
					<div class="relative z-10 mx-auto">
						<img src="src\lib\assets\white-trans.png" alt="PocketRx App" class="pr-15 drop-shadow-xl" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Decorative elements -->
	<div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#0080FF]/20 blur-3xl"></div>
</section>
