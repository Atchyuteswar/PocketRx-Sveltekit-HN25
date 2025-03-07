<script lang="ts">
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { onMount } from 'svelte';

    type Message = {
        role: 'user' | 'assistant';
        content: string;
    };

    let messages: Message[] = [];
    let userInput = '';
    let isTyping = false;
    let error = '';
    let genAI: any;
    let chatModel: any;

    onMount(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            error = 'Gemini API key is not configured.';
            return;
        }
        genAI = new GoogleGenerativeAI(apiKey);
        chatModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Add initial greeting
        messages = [{
            role: 'assistant',
            content: "Hello! I'm your health advisor. Please note that I provide general information only and you should always consult healthcare professionals for medical advice. How can I help you today?"
        }];
    });

    async function sendMessage() {
        if (!userInput.trim() || isTyping) return;

        try {
            const userMessage = userInput.trim();
            messages = [...messages, { role: 'user', content: userMessage }];
            userInput = '';
            isTyping = true;
            error = '';

            const prompt = `You are a helpful medical assistant. Provide general health information and always remind users to consult healthcare professionals for specific medical advice. User query: ${userMessage}`;
            
            const result = await chatModel.generateContent(prompt);
            const response = await result.response;
            const aiResponse = response.text();

            messages = [...messages, { role: 'assistant', content: aiResponse }];
        } catch (e: any) {
            error = 'Failed to get response. Please try again.';
            console.error(e);
        } finally {
            isTyping = false;
        }
    }
</script>

<div class="max-w-4xl mx-auto pt-48 py-8 px-4">
    <div class="bg-white rounded-xl shadow-lg h-[700px] flex flex-col border border-gray-100">
        <div class="p-6 border-b bg-gradient-to-r from-blue-50 to-green-50">
            <div class="flex items-center">
                <div class="bg-blue-100 p-3 rounded-full">
                    <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <h1 class="text-2xl font-bold text-gray-900">Health Advisor Chat</h1>
                    <p class="text-sm text-gray-600">Get instant answers to your health queries</p>
                </div>
            </div>
        </div>

        <!-- Chat messages -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {#each messages as message}
                <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in">
                    <div class="max-w-[80%] rounded-2xl p-4 shadow-sm
                        {message.role === 'user' 
                            ? 'bg-blue-600 text-white ml-4' 
                            : 'bg-white text-gray-800 mr-4'}">
                        {message.content}
                    </div>
                </div>
            {/each}
            {#if isTyping}
                <div class="flex justify-start animate-pulse">
                    <div class="bg-white rounded-2xl p-4 shadow-sm mr-4">
                        <div class="flex space-x-2">
                            <div class="h-3 w-3 bg-gray-200 rounded-full"></div>
                            <div class="h-3 w-3 bg-gray-200 rounded-full"></div>
                            <div class="h-3 w-3 bg-gray-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Error message -->
        {#if error}
            <div class="p-4 mx-6 my-2 text-center text-red-600 bg-red-50 rounded-lg border border-red-100">
                {error}
            </div>
        {/if}

        <!-- Input area -->
        <div class="p-6 border-t bg-white">
            <form on:submit|preventDefault={sendMessage} class="flex gap-4">
                <input
                    type="text"
                    bind:value={userInput}
                    placeholder="Type your health-related question..."
                    class="flex-1 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                    type="submit"
                    disabled={isTyping}
                    class="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center"
                >
                    <span>Send</span>
                    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</div>

<style>
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
