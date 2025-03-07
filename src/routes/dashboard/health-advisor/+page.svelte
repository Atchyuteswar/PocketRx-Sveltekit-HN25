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

<div class="max-w-4xl mx-auto py-8 px-4">
    <div class="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
        <div class="p-4 border-b">
            <h1 class="text-xl font-semibold">Health Advisor Chat</h1>
        </div>

        <!-- Chat messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            {#each messages as message}
                <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-[80%] rounded-lg p-3 {message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}">
                        {message.content}
                    </div>
                </div>
            {/each}
            {#if isTyping}
                <div class="flex justify-start">
                    <div class="bg-gray-100 rounded-lg p-3">
                        Typing...
                    </div>
                </div>
            {/if}
        </div>

        <!-- Error message -->
        {#if error}
            <div class="p-2 text-center text-red-600 bg-red-50">
                {error}
            </div>
        {/if}

        <!-- Input area -->
        <div class="p-4 border-t">
            <form on:submit|preventDefault={sendMessage} class="flex gap-2">
                <input
                    type="text"
                    bind:value={userInput}
                    placeholder="Type your health-related question..."
                    class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={isTyping}
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    </div>
</div>
