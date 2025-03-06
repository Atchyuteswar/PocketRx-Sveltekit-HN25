<script lang="ts">
    import { goto } from '$app/navigation';
    
    let loading = false;
    let error = '';
    
    let formData = {
        email: '',
        password: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        height: '',
        weight: '',
        bloodType: '',
        allergies: '',
        medications: ''
    };

    async function handleSubmit() {
        loading = true;
        error = '';
        
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (response.ok) {
                await goto('/dashboard');
            } else {
                error = data.message || 'Registration failed';
            }
        } catch (err) {
            error = 'An error occurred during registration';
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
    <div class="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg">
        <div class="mb-8">
            <h2 class="text-3xl font-extrabold text-gray-900 text-center">
                Create your account
            </h2>
            <p class="mt-2 text-center text-gray-600">
                Please fill in your health information
            </p>
        </div>

        <!-- Add error message display -->
        {#if error}
            <div class="text-red-600 text-center mb-4">
                {error}
            </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        bind:value={formData.email} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        bind:value={formData.password} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                        type="text" 
                        bind:value={formData.name} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input 
                        type="date" 
                        bind:value={formData.dateOfBirth} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Gender</label>
                    <select 
                        bind:value={formData.gender} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Height (cm)</label>
                    <input 
                        type="number" 
                        bind:value={formData.height} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input 
                        type="number" 
                        bind:value={formData.weight} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Blood Type</label>
                    <select 
                        bind:value={formData.bloodType} 
                        required 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Allergies</label>
                    <textarea 
                        bind:value={formData.allergies} 
                        rows="3" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Current Medications</label>
                    <textarea 
                        bind:value={formData.medications} 
                        rows="3" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
            </div>

            <!-- Update the button to show loading state -->
            <div class="flex items-center justify-between">
                <button 
                    type="submit" 
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={loading}
                >
                    {#if loading}
                        Registering...
                    {:else}
                        Register
                    {/if}
                </button>
            </div>

            <div class="text-center mt-4">
                <a href="/login" class="text-sm text-blue-600 hover:text-blue-500">
                    Already have an account? Sign in
                </a>
            </div>
        </form>
    </div>
</div>
