<script lang="ts">
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { onMount } from 'svelte';

    let fileInput: HTMLInputElement;
    let selectedFile: File | null = null;
    let analysis = '';
    let isAnalyzing = false;
    let error = '';
    let genAI: any;

    onMount(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            error = 'Gemini API key is not configured. Please check your environment variables.';
            return;
        }
        genAI = new GoogleGenerativeAI(apiKey);
        console.log('Gemini AI initialized successfully');
    });

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            if (isValidFileType(file)) {
                selectedFile = file;
                error = '';
            } else {
                error = 'Please upload a valid file (PDF, JPG, or PNG)';
                selectedFile = null;
            }
        }
    }

    function isValidFileType(file: File) {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        return validTypes.includes(file.type);
    }

    async function analyzeReport() {
        if (!selectedFile) return;
        if (!genAI) {
            error = 'Gemini AI is not properly initialized';
            return;
        }

        isAnalyzing = true;
        error = '';
        analysis = '';

        try {
            const base64Data = await fileToBase64(selectedFile);
            
            if (selectedFile.type.startsWith('image/')) {
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
                const prompt = "think yourself as docter, extract the text from the file and Analyze this blood test report and provide a clear and summary of the results. Highlight any abnormal values and provide brief explanations of what they mean.";
                
                const cleanBase64 = base64Data.split(',')[1];
                
                const result = await model.generateContent([
                    prompt,
                    {
                        inlineData: {
                            data: cleanBase64,
                            mimeType: selectedFile.type
                        }
                    }
                ]);

                const response = await result.response;
                analysis = response.text();
            } 
            else {
                const pdfText = await extractTextFromPDF(base64Data);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
                const prompt = `think yourself as docter, Analyze this blood test report and provide a clear and short summary:\n${pdfText}`;
                
                const result = await model.generateContent(prompt);
                const response = await result.response;
                analysis = response.text();
            }
        } catch (e: any) {
            console.error('Full error object:', e);
            const errorMessage = e.message?.includes('403') 
                ? 'Access denied. Please verify your API key has proper permissions.'
                : e.message?.includes('401')
                ? 'Invalid API key. Please check your API key.'
                : e.message || 'An unexpected error occurred';
            error = `Error analyzing report: ${errorMessage}`;
        } finally {
            isAnalyzing = false;
        }
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    async function extractTextFromPDF(base64Data: string) {
        // Using pdf.js or similar library to extract text
        // Implementation depends on the PDF processing library you choose
        return "PDF text extraction to be implemented";
    }
</script>

<div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-2xl font-bold mb-6">Blood Test Report Analyzer</h1>

    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Upload Report (PDF, JPG, or PNG)
            </label>
            <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                on:change={handleFileSelect}
                class="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
            />
        </div>

        {#if error}
            <div class="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
                {error}
            </div>
        {/if}

        {#if selectedFile}
            <button
                on:click={analyzeReport}
                disabled={isAnalyzing}
                class="w-full mb-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Report'}
            </button>
        {/if}

        {#if analysis}
            <div class="mt-6">
                <h2 class="text-lg font-semibold mb-3">Analysis Results:</h2>
                <div class="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                    {analysis}
                </div>
            </div>
        {/if}
    </div>
</div>
