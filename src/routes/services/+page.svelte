<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const services = [
		{
			id: 'report-analysis',
			title: 'Report Analysis',
			description:
				'Scan and analyze lab reports, imaging results, and medical documents with our advanced AI technology.',
			features: [
				'Instant report scanning and analysis',
				'Support for all major lab formats',
				'Historical trend analysis',
				'Automated health insights'
			],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 0 012 2" />
            </svg>`
		},
		{
			id: 'health-tracking',
			title: 'Health Tracking',
			description:
				'Monitor your vital health metrics and receive personalized insights for better health management.',
			features: [
				'Comprehensive health dashboard',
				'Custom health goals',
				'Progress tracking',
				'Smart notifications'
			],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>`
		},
		{
			id: 'ai-insights',
			title: 'AI-Powered Insights',
			description:
				'Get intelligent interpretations of your health data with our advanced machine learning algorithms.',
			features: [
				'Personalized health recommendations',
				'Risk assessment',
				'Treatment tracking',
				'Medication reminders'
			],
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>`
		}
	];

	const faqs = [
		{
			question: 'How accurate is your report analysis?',
			answer:
				'Our AI-powered analysis system has been validated with over 1 million medical reports and maintains a 99.9% accuracy rate. We regularly update our algorithms based on the latest medical research and standards.'
		},
		{
			question: 'Is my health data secure?',
			answer:
				'Yes, we take data security very seriously. All your health information is encrypted using bank-level security protocols, and we are fully HIPAA compliant. Your data is never shared without your explicit consent.'
		},
		{
			question: 'Can I share my reports with my healthcare provider?',
			answer:
				'Absolutely! You can easily share your reports and insights with your healthcare providers through our secure sharing feature. They can access a comprehensive view of your health data through our healthcare provider portal.'
		}
	];
</script>

<svelte:head>
	<title>Services - PocketRx</title>
	<meta
		name="description"
		content="Discover how PocketRx can help you understand and manage your health information better."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-b from-[#f5f9ff] via-white to-white pt-32 pb-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<h1
				class="mb-6 text-4xl font-extrabold tracking-tight text-[#00203F] sm:text-5xl"
				data-aos="fade-up"
			>
				Our <span class="gradient-text">Services</span>
			</h1>
			<p class="text-xl text-gray-700" data-aos="fade-up" data-aos-delay="100">
				Comprehensive solutions for understanding and managing your health information
			</p>
		</div>
	</div>

	<!-- Background elements -->
	<div class="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
	<div class="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#0080FF]/5 blur-3xl"></div>
</section>

<!-- Services Section -->
<section class="section-padding bg-white">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-3">
			{#each services as service, i}
				<div
					class="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
					data-aos="fade-up"
					data-aos-delay={i * 100}
				>
					<div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ADEFD1]/30">
						{@html service.icon}
					</div>
					<h3 class="mb-4 text-xl font-semibold text-[#00203F]">{service.title}</h3>
					<p class="mb-6 text-gray-600">{service.description}</p>
					<ul class="space-y-3">
						{#each service.features as feature}
							<li class="flex items-center text-gray-600">
								<svg
									class="mr-3 h-5 w-5 text-[#00203F]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								{feature}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="section-padding bg-gradient-to-b from-white to-[#f5f9ff]">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
				Frequently Asked Questions
			</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
				Find answers to common questions about our services
			</p>
		</div>

		<div class="mx-auto max-w-3xl">
			<div class="space-y-6" data-aos="fade-up" data-aos-delay="200">
				{#each faqs as faq, i}
					<details class="group rounded-lg border border-gray-200 bg-white">
						<summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6">
							<h2 class="text-lg font-medium text-[#00203F]">{faq.question}</h2>
							<svg
								class="h-5 w-5 transition-transform group-open:rotate-180"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</summary>
						<div class="px-6 pb-6 text-gray-600">
							<p>{faq.answer}</p>
						</div>
					</details>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section
	class="relative overflow-hidden bg-gradient-to-r from-[#00203F] to-[#00305F] py-20 text-white"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-3xl font-bold sm:text-4xl" data-aos="fade-up">
				Ready to Transform How You Understand Your Health?
			</h2>
			<p class="mb-10 text-xl text-white/80" data-aos="fade-up" data-aos-delay="100">
				Join thousands of users who have taken control of their health journey with PocketRx
			</p>
			<div
				class="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<a
					href="/contact-us"
					class="rounded-lg bg-white px-8 py-3 text-lg font-medium text-[#00203F] transition-all hover:bg-[#ADEFD1] hover:shadow-lg"
				>
					Get Started
				</a>
				<a
					href="/about"
					class="rounded-lg border-2 border-white px-8 py-3 text-lg font-medium text-white transition-all hover:bg-white/10 hover:shadow-lg"
				>
					Learn More
				</a>
			</div>
		</div>
	</div>

	<!-- Decorative elements -->
	<div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#0080FF]/10 blur-3xl"></div>
</section>
