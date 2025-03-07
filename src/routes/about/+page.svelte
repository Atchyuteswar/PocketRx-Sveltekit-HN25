<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';

	// Team members data
	const team = [
		{
			name: 'Adarsh Yerram',
			role: 'Founder & CEO',
			image: 'src/lib/assets/team/adarsh-dp.jpeg',
			bio: 'Student at Marri Laxman Reddy Institution of Technology and Management - Hyderabad.'
		},
		{
			name: 'Atchyuteswar Gottumukkala',
			role: 'Chief Technical Officer',
			image: 'src/lib/assets/team/atchyut-dp.jpeg',
			bio: 'Student at Marri Laxman Reddy Institution of Technology and Management - Hyderabad.'
		},
		{
			name: 'Srujana Niranjan',
			role: 'Head of Research',
			image: 'src/lib/assets/team/srujana-dp.jpeg',
			bio: 'Student Nalla Narasimha Reddy Group - Hyderabad.'
		},
		{
			name: 'Pooja Kasini',
			role: 'Product Designer',
			image: 'src/lib/assets/team/pooja-dp.jpeg',
			bio: 'Student at NxtWave Institution of Advanced Technologies - Hyderabad.'
		}
	];

	let isInViewport = false;
	let valueContainer: HTMLElement;

	onMount(() => {
		// Create intersection observer for animated values
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				isInViewport = true;
			}
		});

		if (valueContainer) {
			observer.observe(valueContainer);
		}

		return () => {
			if (valueContainer) observer.unobserve(valueContainer);
		};
	});
</script>

<svelte:head>
	<title>About Us - PocketRx</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-b from-[#f5f9ff] via-white to-white pt-32 pb-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1
				class="mb-6 text-4xl font-extrabold tracking-tight text-[#00203F] sm:text-5xl"
				data-aos="fade-up"
			>
				About <span class="gradient-text">PocketRx</span>
			</h1>
			<p class="text-xl text-gray-700" data-aos="fade-up" data-aos-delay="100">
				Our mission is to empower individuals by making health information accessible,
				understandable, and actionable for everyone.
			</p>
		</div>
	</div>

	<!-- Background elements -->
	<div class="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
	<div class="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#0080FF]/5 blur-3xl"></div>
</section>

<!-- Our Story Section -->
<section class="section-padding bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
			<div data-aos="fade-right">
				<h2 class="mb-6 text-3xl font-bold text-[#00203F] sm:text-4xl">Our Story</h2>
				<div class="space-y-4 text-gray-700">
					<p>
						PocketRx was born from a simple observation: despite living in an information age, many
						people still struggle to understand their own health data. Medical reports are filled
						with complex terminology and reference ranges that leave patients confused and anxious.
					</p>
					<p>
						Founded in 2023 by Dr. Alex Johnson, PocketRx started with the vision of developing a
						tool that would translate medical jargon into plain language. What began as a simple
						report translator has evolved into a comprehensive health intelligence platform.
					</p>
					<p>
						Today, PocketRx helps over 100,000 users understand their health reports, track vital
						metrics, and make informed decisions about their wellbeing. Our team of healthcare
						professionals, data scientists, and developers work tirelessly to ensure our platform
						delivers accurate, personalized insights.
					</p>
				</div>
				<div class="mt-8">
					<a href="/services" class="btn-primary inline-block">Our Services</a>
				</div>
			</div>
			<div class="relative" data-aos="fade-left" data-aos-delay="200">
				<div class="relative mx-auto max-w-lg">
					<!-- Main image -->
					<img
						src="src\lib\assets\about-hero.jpg"
						alt="PocketRx team working"
						class="relative z-10 w-full rounded-lg shadow-xl"
					/>

					<!-- Decorative elements -->
					<div
						class="absolute -right-8 -bottom-8 z-0 h-full w-full rounded-lg border-2 border-[#ADEFD1]"
					></div>
					<div class="absolute -top-5 -left-5 z-20 h-20 w-20 rounded-lg bg-[#00203F] p-5">
						<div
							class="flex h-full w-full items-center justify-center text-center text-xl font-bold text-white"
						>
							est.<br />2025
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Key Values Section -->
<section class="section-padding bg-gradient-to-b from-white to-[#f5f9ff]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				Our Values
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				The principles that guide our work and shape our product
			</p>
		</div>

		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
			<!-- Value 1 -->
			<div
				class="rounded-xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
				data-aos="fade-up"
				data-aos-delay="0"
			>
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ADEFD1]/30 text-[#00203F]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-[#00203F]">Accessibility</h3>
				<p class="text-gray-600">
					Health information should be accessible and understandable to everyone, regardless of
					their medical background.
				</p>
			</div>

			<!-- Value 2 -->
			<div
				class="rounded-xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ADEFD1]/30 text-[#00203F]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
						/>
					</svg>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-[#00203F]">Privacy</h3>
				<p class="text-gray-600">
					We maintain the highest standards of security and confidentiality with your personal
					health data.
				</p>
			</div>

			<!-- Value 3 -->
			<div
				class="rounded-xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ADEFD1]/30 text-[#00203F]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
						/>
					</svg>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-[#00203F]">Accuracy</h3>
				<p class="text-gray-600">
					Our insights are grounded in medical science and rigorously validated by healthcare
					professionals.
				</p>
			</div>

			<!-- Value 4 -->
			<div
				class="rounded-xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
				data-aos="fade-up"
				data-aos-delay="300"
			>
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#ADEFD1]/30 text-[#00203F]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h3 class="mb-4 text-xl font-semibold text-[#00203F]">Innovation</h3>
				<p class="text-gray-600">
					We continuously improve our technology to offer the most advanced health intelligence
					tools.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Key Metrics Section -->
<section class="section-padding bg-[#00203F] text-white">
	<div bind:this={valueContainer} class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<p class="mb-4 text-3xl font-bold sm:text-4xl" data-aos="fade-up">Our Impact</p>
			<p class="mx-auto max-w-3xl text-lg text-white/80" data-aos="fade-up" data-aos-delay="100">
				The numbers that show our commitment to making health information accessible
			</p>
		</div>

		<div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
			<!-- Metric 1 -->
			<div class="text-center" data-aos="zoom-in" data-aos-delay="0">
				<div class="mb-2 text-5xl font-bold text-[#ADEFD1]">
					{#if isInViewport}
						<span class="font-bold" in:fade={{ duration: 500, delay: 200 }}>100k+</span>
					{:else}
						<span>—</span>
					{/if}
				</div>
				<p class="text-lg text-white/80">Active Users</p>
			</div>

			<!-- Metric 2 -->
			<div class="text-center" data-aos="zoom-in" data-aos-delay="100">
				<div class="mb-2 text-5xl font-bold text-[#ADEFD1]">
					{#if isInViewport}
						<span class="font-bold" in:fade={{ duration: 500, delay: 400 }}>5M+</span>
					{:else}
						<span>—</span>
					{/if}
				</div>
				<p class="text-lg text-white/80">Reports Analyzed</p>
			</div>

			<!-- Metric 3 -->
			<div class="text-center" data-aos="zoom-in" data-aos-delay="200">
				<div class="mb-2 text-5xl font-bold text-[#ADEFD1]">
					{#if isInViewport}
						<span class="font-bold" in:fade={{ duration: 500, delay: 600 }}>98%</span>
					{:else}
						<span>—</span>
					{/if}
				</div>
				<p class="text-lg text-white/80">User Satisfaction</p>
			</div>

			<!-- Metric 4 -->
			<div class="text-center" data-aos="zoom-in" data-aos-delay="300">
				<div class="mb-2 text-5xl font-bold text-[#ADEFD1]">
					{#if isInViewport}
						<span class="font-bold" in:fade={{ duration: 500, delay: 800 }}>20+</span>
					{:else}
						<span>—</span>
					{/if}
				</div>
				<p class="text-lg text-white/80">Partner Hospitals</p>
			</div>
		</div>
	</div>
</section>

<!-- Team Section -->
<section class="section-padding bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				Our Team
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				Meet the experts behind PocketRx who are passionate about making healthcare more accessible
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each team as member, i}
				<div
					class="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl"
					data-aos="fade-up"
					data-aos-delay={i * 100}
				>
					<div class="relative h-80 overflow-hidden">
						<img
							src={member.image}
							alt={member.name}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-[#00203F]/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
						<div
							class="absolute bottom-0 left-0 w-full translate-y-full p-6 text-white transition-transform duration-300 group-hover:translate-y-0"
						>
							<p class="text-sm">{member.bio}</p>
						</div>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-semibold text-[#00203F]">{member.name}</h3>
						<p class="text-[#0080FF]">{member.role}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section
	class="relative overflow-hidden bg-gradient-to-r from-[#00203F] to-[#00203F]/90 py-20 text-white"
>
	<div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
			<div data-aos="fade-right">
				<p class="mb-6 text-3xl font-bold sm:text-4xl">Join the Health Intelligence Revolution</p>
				<p class="mb-8 text-lg text-white/80">
					Download PocketRx today and take the first step towards understanding your health like
					never before. Our app is available on both iOS and Android platforms.
				</p>
				<div class="flex flex-wrap gap-4">
					<button
						class="flex items-center rounded-lg bg-white px-6 py-3 text-[#00203F] transition-all duration-300 hover:bg-[#ADEFD1]"
					>
						<svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.231-1.725-.753-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z"
							/>
						</svg>
						App Store
					</button>
					<button
						class="flex items-center rounded-lg bg-white px-6 py-3 text-[#00203F] transition-all duration-300 hover:bg-[#ADEFD1]"
					>
						<svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M3 20.269v-9.767a7.113 7.113 0 0 1 2.239-2.466L6.098 7.39 12.141 3l6.143 4.39a6.96 6.96 0 0 1 2.716 5.55v7.33a2.741 2.741 0 0 1-2.045 2.641 2.296 2.296 0 0 1-2.878-1.386c-.522-1.212-.807-2.538-.807-3.87v-4.048L12 16.154l-3.229-2.598v3.463c0 1.382-.28 2.751-.824 3.999a2.313 2.313 0 0 1-2.932 1.286A2.71 2.71 0 0 1 3 20.269z"
							/>
						</svg>
						Play Store
					</button>
				</div>
			</div>
			<div class="relative" data-aos="fade-left" data-aos-delay="200">
				<div class="relative mx-auto max-w-sm">
					<div class="relative z-10">
						<img src="/images/app-mockup.png" alt="PocketRx App" class="w-full" />
					</div>

					<!-- Animated app features floating around the phone -->
					<div
						class="absolute -top-12 -right-8 rounded-lg bg-white p-3 shadow-lg"
						data-aos="fade-down-left"
						data-aos-delay="400"
					>
						<div class="flex items-center space-x-2">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ADEFD1]/60">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-[#00203F]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
							</div>
							<span class="font-medium">Report Scan</span>
						</div>
					</div>

					<div
						class="absolute -bottom-8 -left-8 rounded-lg bg-white p-3 shadow-lg"
						data-aos="fade-up-right"
						data-aos-delay="600"
					>
						<div class="flex items-center space-x-2">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#ADEFD1]/60">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-[#00203F]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<span class="font-medium">Health Tracking</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Decorative elements -->
	<div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#0080FF]/10 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
</section>
