<!-- src/lib/components/Footer.svelte -->
<script>
    import { fade, fly } from 'svelte/transition';
</script>

<footer class="relative bg-gradient-to-b from-white via-[#f7fdfa] to-[#e8f7f2] py-16"> 
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
            <!-- Company Info -->
            <div class="text-center md:text-left">
                <div class="space-y-6">
                    <div class="flex items-center justify-center md:justify-start">
                        <img src="src/lib/assets/black-trans.png" alt="PocketRx Logo" class="h-16" />
                    </div>
                    <p class="text-lg text-[#00203F]/80">
                        "Making health reports understandable for everyone. Your health, simplified."
                    </p>
                    <!-- App Store Buttons -->
                    <div class="flex flex-wrap justify-center md:justify-start gap-4">
                        <button
                            class="flex items-center rounded-lg bg-[#00203F] px-5 py-2.5 text-white transition-all hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            <svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c-.537.767-.978 1.297-1.316 1.592-.525.482-1.089.73-1.692.744-.432 0-.954-.123-1.562-.373-.61-.249-1.17-.371-1.683-.371-.537 0-1.113.122-1.73.371-.616.25-1.114.381-1.495.393-.577.019-1.153-.231-1.725-.753-.367-.32-.826-.87-1.377-1.648-.59-.829-1.075-1.794-1.455-2.891-.407-1.187-.611-2.335-.611-3.447 0-1.273.275-2.372.826-3.292a4.857 4.857 0 0 1 1.73-1.751 4.65 4.65 0 0 1 2.34-.662c.46 0 1.063.142 1.81.422s1.227.422 1.436.422c.158 0 .689-.167 1.593-.498.853-.307 1.573-.434 2.163-.384 1.6.129 2.801.759 3.6 1.895-1.43.867-2.137 2.08-2.123 3.637.012 1.213.453 2.222 1.317 3.023a4.33 4.33 0 0 0 1.315.863c-.106.307-.218.6-.336.882zM15.998 2.38c0 .95-.348 1.838-1.039 2.659-.836.976-1.846 1.541-2.941 1.452a2.955 2.955 0 0 1-.021-.36c0-.913.396-1.889 1.103-2.688.352-.404.8-.741 1.343-1.009.542-.264 1.054-.41 1.536-.435.013.128.019.255.019.381z" />
                            </svg>
                            App Store
                        </button>
                        <button
                            class="flex items-center rounded-lg bg-[#00203F] px-5 py-2.5 text-white transition-all hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            <svg class="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 20.269v-9.767a7.113 7.113 0 0 1 2.239-2.466L6.098 7.39 12.141 3l6.143 4.39a6.96 6.96 0 0 1 2.716 5.55v7.33a2.741 2.741 0 0 1-2.045 2.641 2.296 2.296 0 0 1-2.878-1.386c-.522-1.212-.807-2.538-.807-3.87v-4.048L12 16.154l-3.229-2.598v3.463c0 1.382-.28 2.751-.824 3.999a2.313 2.313 0 0 1-2.932 1.286A2.71 2.71 0 0 1 3 20.269z" />
                            </svg>
                            Play Store
                        </button>
                    </div>
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 class="mb-6 text-xl font-semibold text-[#00203F]">Quick Links</h4>
                <ul class="space-y-3">
                    <li>
                        <a
                            href="/"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >Home</a
                        >
                    </li>
                    <li>
                        <a
                            href="/about"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >About</a
                        >
                    </li>
                    <li>
                        <a
                            href="/services"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >Services</a
                        >
                    </li>
                    <li>
                        <a
                            href="/contact-us"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >Contact</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Support Links -->
            <div>
                <h4 class="mb-6 text-xl font-semibold text-[#00203F]">Support</h4>
                <ul class="space-y-3">
                    <li>
                        <a
                            href="/privacy"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >Privacy Policy</a
                        >
                    </li>
                    <li>
                        <a
                            href="/terms"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >Terms of Use</a
                        >
                    </li>
                    <li>
                        <a
                            href="/faq"
                            class="inline-block text-[#00203F]/80 transition-all hover:translate-x-1 hover:text-[#00203F]"
                            >FAQ</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Social Links -->
            <div>
                <h4 class="mb-6 text-xl font-semibold text-[#00203F]">Connect With Us</h4>
                <div class="flex space-x-4 mb-6">
                    <a href="#" class="group rounded-full bg-[#00203F]/5 p-3 transition-all hover:bg-[#00203F]">
                        <svg class="h-5 w-5 text-[#00203F] transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                    </a>
                    <a href="#" class="group rounded-full bg-[#00203F]/5 p-3 transition-all hover:bg-[#00203F]">
                        <svg class="h-5 w-5 text-[#00203F] transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                        </svg>
                    </a>
                    <a href="#" class="group rounded-full bg-[#00203F]/5 p-3 transition-all hover:bg-[#00203F]">
                        <svg class="h-5 w-5 text-[#00203F] transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
                <div class="space-y-2">
                    <p class="text-[#00203F]/80">Get in touch with us</p>
                    <a href="mailto:support@pocketrx.com" class="block font-medium text-[#00203F] hover:text-[#00203F]/80">
                        support@pocketrx.com
                    </a>
                </div>
            </div>
        </div>

        <div class="mt-12 border-t border-[#00203F]/10 pt-8 text-center">
            <p class="text-sm text-[#00203F]/60">
                © {new Date().getFullYear()} PocketRx. All rights reserved.
            </p>
        </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute bottom-0 left-0 h-12 w-12 rounded-full bg-[#ADEFD1]/30 blur-xl" data-aos="fade-right" data-aos-delay="200"></div>
    <div class="absolute top-12 right-12 h-24 w-24 rounded-full bg-[#ADEFD1]/20 blur-xl" data-aos="fade-left" data-aos-delay="300"></div>
</footer>

<style>
    a {
        transition: all 0.3s ease;
    }
</style>