<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
    <div class="text-center">
        <h1 class="mb-4 text-4xl font-bold text-[#00203F]">
            {$page.status}: {$page.error?.message || 'Page not found'}
        </h1>
        <p class="mb-8 text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
        </p>
        <a
            href="/"
            class="inline-flex items-center rounded-lg bg-[#00203F] px-8 py-3 text-lg font-medium text-white transition-all hover:bg-[#003060]"
        >
            Go back home
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
            </svg>
        </a>
    </div>
</div>
