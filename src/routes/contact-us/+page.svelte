<script lang="ts">
    import { onMount } from 'svelte';
    import emailjs from '@emailjs/browser';
    import { browser } from '$app/environment';
    import { env } from '$env/dynamic/public';
    import AOS from 'aos';
    import 'aos/dist/aos.css';
    import { fly, fade } from 'svelte/transition';

    let name = '';
    let email = '';
    let message = '';
    let loading = false;
    let success = false;
    let error = '';
    let formSubmitted = false;
    let formSubmitting = false;

    const PUBLIC_KEY = env.PUBLIC_EMAILJS_PUBLIC_KEY;
    const TEMPLATE_ID = env.PUBLIC_EMAILJS_TEMPLATE_ID;
    const SERVICE_ID = env.PUBLIC_EMAILJS_SERVICE_ID;

    onMount(() => {
        if (browser) {
            try {
                emailjs.init(PUBLIC_KEY);
                AOS.init({
                    duration: 800,
                    once: true,
                    offset: 100,
                    easing: 'ease-out-cubic'
                });
            } catch (e) {
                console.error('EmailJS initialization error:', e);
            }
        }
    });

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        loading = true;
        formSubmitting = true;
        error = '';
        success = false;

        const templateParams = {
            from_name: name,
            to_name: 'PocketRx Team',
            reply_to: email,
            message: message
        };

        try {
            // If EmailJS is configured, use it
            if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
                const response = await emailjs.sendForm(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    e.target as HTMLFormElement,
                    PUBLIC_KEY
                );

                if (response.status === 200) {
                    success = true;
                    formSubmitted = true;
                    name = '';
                    email = '';
                    message = '';
                } else {
                    throw new Error('Failed to send email');
                }
            } else {
                // Simulate form submission if EmailJS is not configured
                await new Promise(resolve => setTimeout(resolve, 1500));
                formSubmitted = true;
                name = '';
                email = '';
                message = '';
            }
        } catch (e) {
            console.error('Error sending email:', e);
            error = 'Failed to send message. Please try again later.';
        } finally {
            loading = false;
            formSubmitting = false;
        }
    }

    // Office locations
    const offices = [
        {
            city: 'San Francisco',
            address: '1234 Tech Avenue, Suite 500',
            postal: 'San Francisco, CA 94107',
            phone: '+1 (415) 555-1234',
            email: 'sf@pocketrx.com'
        },
        {
            city: 'New York',
            address: '567 Innovation Street',
            postal: 'New York, NY 10001',
            phone: '+1 (212) 555-6789',
            email: 'ny@pocketrx.com'
        },
        {
            city: 'London',
            address: '89 Health Lane',
            postal: 'London, UK EC2A 4NE',
            phone: '+44 20 7123 4567',
            email: 'uk@pocketrx.com'
        }
    ];
</script>

<svelte:head>
    <title>Contact Us - PocketRx</title>
    <meta
        name="description"
        content="Get in touch with the PocketRx team for support, partnerships, or general inquiries."
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
                Contact <span class="gradient-text">Us</span>
            </h1>
            <p class="text-xl text-gray-700" data-aos="fade-up" data-aos-delay="100">
                Have questions or feedback? We'd love to hear from you. Get in touch with our team.
            </p>
        </div>
    </div>

    <!-- Background elements -->
    <div class="absolute top-0 left-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
    <div class="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#0080FF]/5 blur-3xl"></div>
</section>

<!-- Contact Section -->
<section class="section-padding bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-2">
            <!-- Contact Form -->
            <div data-aos="fade-right">
                <div class="rounded-xl bg-white p-8 shadow-xl">
                    <h2 class="mb-6 text-2xl font-bold text-[#00203F]">Send Us a Message</h2>

                    {#if formSubmitted}
                        <div in:fly={{ y: 20, duration: 500 }} class="rounded-lg bg-green-50 p-6 text-center">
                            <svg
                                class="mx-auto mb-4 h-12 w-12 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 class="mb-2 text-xl font-medium text-green-800">Message Sent!</h3>
                            <p class="text-green-700">
                                Thank you for reaching out. We'll get back to you shortly.
                            </p>
                        </div>
                    {:else}
                        <form on:submit={handleSubmit} class="space-y-6">
                            <div class="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label for="first-name" class="mb-2 block text-sm font-medium text-gray-700"
                                        >First Name</label
                                    >
                                    <input
                                        type="text"
                                        id="first-name"
                                        name="first-name"
                                        required
                                        class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00203F] focus:outline-none focus:ring-2 focus:ring-[#00203F]/20"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label for="last-name" class="mb-2 block text-sm font-medium text-gray-700"
                                        >Last Name</label
                                    >
                                    <input
                                        type="text"
                                        id="last-name"
                                        name="last-name"
                                        required
                                        class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00203F] focus:outline-none focus:ring-2 focus:ring-[#00203F]/20"
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="email" class="mb-2 block text-sm font-medium text-gray-700"
                                    >Email Address</label
                                >
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    bind:value={email}
                                    class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00203F] focus:outline-none focus:ring-2 focus:ring-[#00203F]/20"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label for="subject" class="mb-2 block text-sm font-medium text-gray-700"
                                    >Subject</label
                                >
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00203F] focus:outline-none focus:ring-2 focus:ring-[#00203F]/20"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <div>
                                <label for="message" class="mb-2 block text-sm font-medium text-gray-700"
                                    >Message</label
                                >
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    bind:value={message}
                                    class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#00203F] focus:outline-none focus:ring-2 focus:ring-[#00203F]/20"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={formSubmitting}
                                class={`w-full rounded-lg bg-[#00203F] px-6 py-3 font-medium text-white transition-all hover:bg-[#003060] disabled:opacity-70 ${formSubmitting ? 'animate-pulse' : ''}`}
                            >
                                {formSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            {#if error}
                                <div class="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                                    <p>{error}</p>
                                </div>
                            {/if}
                        </form>
                    {/if}
                </div>
            </div>

            <!-- Contact Info -->
            <div data-aos="fade-left" data-aos-delay="200">
                <h2 class="mb-6 text-2xl font-bold text-[#00203F]">Other Ways to Reach Us</h2>

                <div class="mb-8">
                    <h3 class="mb-4 text-xl font-semibold text-[#00203F]">Customer Support</h3>
                    <div class="space-y-3 text-lg">
                        <div class="flex items-start">
                            <div
                                class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#ADEFD1]/30"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 text-[#00203F]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-[#00203F]">Email</p>
                                <a href="mailto:support@pocketrx.com" class="text-gray-600 hover:text-[#00203F]">
                                    support@pocketrx.com
                                </a>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#ADEFD1]/30"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 text-[#00203F]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-[#00203F]">Phone</p>
                                <a href="tel:+18005551234" class="text-gray-600 hover:text-[#00203F]">
                                    +1 (800) 555-1234
                                </a>
                            </div>
                        </div>

                        <div class="flex items-start">
                            <div
                                class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#ADEFD1]/30"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 text-[#00203F]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p class="font-medium text-[#00203F]">Live Chat</p>
                                <p class="text-gray-600">Available 24/7 in our app</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <h3 class="mb-4 text-xl font-semibold text-[#00203F]">Business Hours</h3>
                    <table class="w-full text-gray-600">
                        <tbody>
                            <tr>
                                <td class="py-2 font-medium">Monday - Friday:</td>
                                <td>8:00 AM - 8:00 PM EST</td>
                            </tr>
                            <tr>
                                <td class="py-2 font-medium">Saturday:</td>
                                <td>9:00 AM - 5:00 PM EST</td>
                            </tr>
                            <tr>
                                <td class="py-2 font-medium">Sunday:</td>
                                <td>Closed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3 class="mb-4 text-xl font-semibold text-[#00203F]">Connect With Us</h3>
                    <div class="flex space-x-4">
                        <a
                            href="#"
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00203F]/10 transition-all hover:bg-[#00203F] hover:text-white"
                            aria-label="Twitter"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00203F]/10 transition-all hover:bg-[#00203F] hover:text-white"
                            aria-label="Facebook"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00203F]/10 transition-all hover:bg-[#00203F] hover:text-white"
                            aria-label="Instagram"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#00203F]/10 transition-all hover:bg-[#00203F] hover:text-white"
                            aria-label="LinkedIn"
                        >
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Office Locations -->
<section class="section-padding bg-gradient-to-b from-white to-[#f5f9ff]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-16 text-center">
            <h2 class="mb-4 text-3xl font-bold text-[#00203F] sm:text-4xl" data-aos="fade-up">
                Our Offices
            </h2>
            <p class="mx-auto max-w-3xl text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
                PocketRx has offices around the globe to serve our international user base
            </p>
        </div>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {#each offices as office, i}
                <div
                    class="rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                >
                    <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ADEFD1]/30">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-8 w-8 text-[#00203F]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-semibold text-[#00203F]">{office.city}</h3>
                    <div class="mb-6 space-y-1 text-gray-600">
                        <p>{office.address}</p>
                        <p>{office.postal}</p>
                    </div>
                    <div class="space-y-2">
                        <div class="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-3 h-5 w-5 text-[#00203F]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <a href={`tel:${office.phone}`} class="text-gray-600 hover:text-[#00203F]">
                                {office.phone}
                            </a>
                        </div>
                        <div class="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-3 h-5 w-5 text-[#00203F]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <a href={`mailto:${office.email}`} class="text-gray-600 hover:text-[#00203F]">
                                {office.email}
                            </a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<!-- Map Section -->
<!-- Map Section -->
<section class="section-padding bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="rounded-xl bg-gray-100 p-2 shadow-inner">
            <div class="relative h-[400px] w-full overflow-hidden rounded-lg" data-aos="fade-up">
                <!-- You would typically embed a Google Map or similar here -->
                <div class="absolute inset-0 bg-gray-200">
                    <div class="flex h-full w-full items-center justify-center">
                        <div class="text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="mx-auto mb-4 h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                            </svg>
                            <p class="text-gray-500">Interactive map will be displayed here</p>
                            <p class="mt-2 text-sm text-gray-400">
                                Please enable JavaScript to view the interactive map
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
                Find quick answers to common questions about contacting us and our support services
            </p>
        </div>

        <div class="mx-auto max-w-3xl">
            <div class="space-y-6" data-aos="fade-up" data-aos-delay="200">
                <details class="group rounded-lg border border-gray-200 bg-white [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6">
                        <h2 class="text-lg font-medium text-[#00203F]">
                            What are your typical response times?
                        </h2>
                        <svg
                            class="h-5 w-5 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div class="px-6 pb-6 text-gray-600">
                        We aim to respond to all inquiries within 24 hours. For urgent matters, our live chat support is available 24/7 through the PocketRx app.
                    </div>
                </details>

                <details class="group rounded-lg border border-gray-200 bg-white [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6">
                        <h2 class="text-lg font-medium text-[#00203F]">
                            How can I schedule a demo of PocketRx?
                        </h2>
                        <svg
                            class="h-5 w-5 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div class="px-6 pb-6 text-gray-600">
                        You can schedule a demo by filling out our contact form above or emailing us directly at demos@pocketrx.com. We'll get back to you within one business day to arrange a time.
                    </div>
                </details>

                <details class="group rounded-lg border border-gray-200 bg-white [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex cursor-pointer items-center justify-between gap-1.5 p-6">
                        <h2 class="text-lg font-medium text-[#00203F]">
                            Do you offer technical support outside business hours?
                        </h2>
                        <svg
                            class="h-5 w-5 transition-transform group-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div class="px-6 pb-6 text-gray-600">
                        Yes, our in-app support team is available 24/7 for technical issues. For non-urgent matters, you can submit a ticket through our help center or email support@pocketrx.com.
                    </div>
                </details>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="relative overflow-hidden bg-gradient-to-r from-[#00203F] to-[#00305F] py-20 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
            <h2 class="mb-6 text-3xl font-bold sm:text-4xl" data-aos="fade-up">
                Ready to Get Started with PocketRx?
            </h2>
            <p class="mb-10 text-xl text-white/80" data-aos="fade-up" data-aos-delay="100">
                Download our app today and take control of your health information
            </p>
            <div class="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0" data-aos="fade-up" data-aos-delay="200">
                <a href="/download" class="inline-flex items-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-[#00203F] transition-all hover:bg-[#ADEFD1] hover:shadow-lg">
                    <svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.231-1.725-.753-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882z" />
                    </svg>
                    App Store
                </a>
                <a href="/download" class="inline-flex items-center rounded-lg border-2 border-white px-8 py-3 text-lg font-medium text-white transition-all hover:bg-white/10 hover:shadow-lg">
                    <svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 20.269v-9.767a7.113 7.113 0 0 1 2.239-2.466L6.098 7.39 12.141 3l6.143 4.39a6.96 6.96 0 0 1 2.716 5.55v7.33a2.741 2.741 0 0 1-2.045 2.641 2.296 2.296 0 0 1-2.878-1.386c-.522-1.212-.807-2.538-.807-3.87v-4.048L12 16.154l-3.229-2.598v3.463c0 1.382-.28 2.751-.824 3.999a2.313 2.313 0 0 1-2.932 1.286A2.71 2.71 0 0 1 3 20.269z" />
                    </svg>
                    Play Store
                </a>
            </div>
        </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#ADEFD1]/10 blur-3xl"></div>
    <div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#0080FF]/10 blur-3xl"></div>
</section>