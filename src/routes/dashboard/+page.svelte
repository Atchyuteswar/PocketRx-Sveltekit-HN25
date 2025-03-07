<script lang="ts">
    import { user, auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    function handleUploadReport() {
        goto('/dashboard/report-analyser');
    }

    function handleGetAdvice() {
        // TODO: Implement health advice functionality
    }

    onMount(() => {
        if (!$auth.isAuthenticated) {
            goto('/');
        }
    });
</script>

<div class="min-h-screen bg-gray-100 py-12 px-4 pt-48 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Welcome to PocketRx Dashboard</h1>
            {#if $user}
                <p class="text-gray-600">Hello, {$user.name}</p>
            {/if}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Blood Test Report Summarizer Card -->
            <div class="bg-white overflow-hidden shadow-sm rounded-lg transition-transform hover:scale-105">
                <div class="p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l2 2 4-4"/>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h2 class="text-xl font-semibold text-gray-900">Blood Test Report Summarizer</h2>
                            <p class="mt-2 text-gray-600">Upload your blood test reports and get instant analysis and insights.</p>
                        </div>
                    </div>
                    <div class="mt-6">
                        <div class="space-y-4">
                            <p class="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
                            <button
                                on:click={handleUploadReport}
                                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Upload Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Health Advisor Card -->
            <a href="/dashboard/health-advisor" class="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold mb-2">Health Advisor</h3>
                <p class="text-gray-600">Get instant answers to your health-related questions from our AI health advisor.</p>
            </a>
        </div>
    </div>
</div>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p>Welcome, {$auth.user?.name}!</p>
</div>
