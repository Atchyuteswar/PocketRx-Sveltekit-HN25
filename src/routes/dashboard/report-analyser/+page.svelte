<script lang="ts">
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import { onMount } from 'svelte';
    import * as pdfjsLib from 'pdfjs-dist';

    // Initialize PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    let fileInput: HTMLInputElement;
    let selectedFile: File | null = null;
    let fileName: string = '';
    let fileSize: string = '';
    let analysis = '';
    let isAnalyzing = false;
    let loadingProgress = 0;
    let error = '';
    let genAI: any;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

    onMount(() => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            error = 'Gemini API key is not configured. Please check your environment variables.';
            return;
        }
        
        try {
            genAI = new GoogleGenerativeAI(apiKey);
            console.log('Gemini AI initialized successfully');
        } catch (err) {
            console.error('Failed to initialize Gemini:', err);
            error = 'Failed to initialize AI service. Please try refreshing the page.';
        }
    });

    function handleFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            
            // Check file size
            if (file.size > MAX_FILE_SIZE) {
                error = `File too large. Maximum size is ${MAX_FILE_SIZE/1024/1024}MB.`;
                selectedFile = null;
                return;
            }
            
            if (isValidFileType(file)) {
                selectedFile = file;
                fileName = file.name;
                fileSize = formatFileSize(file.size);
                error = '';
            } else {
                error = 'Please upload a valid file (PDF, JPG, or PNG)';
                selectedFile = null;
                fileName = '';
                fileSize = '';
            }
        }
    }

    function formatFileSize(bytes: number): string {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
        loadingProgress = 10;
        error = '';
        analysis = '';

        try {
            // Step 1: Process the file
            loadingProgress = 20;
            const base64Data = await fileToBase64(selectedFile);
            loadingProgress = 40;
            
            // Step 2: Prepare for AI analysis
            let textContent = '';
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            
            if (selectedFile.type.startsWith('image/')) {
                loadingProgress = 50;
                // Enhanced prompt for better results
                const prompt = `Analyze this blood test report image as a medical professional:
                1. Extract ALL test parameters and their values
                2. Identify abnormal values (high or low)
                3. Explain what each abnormal value might indicate
                4. Provide a concise summary of overall health indications
                5. Note any values that require immediate attention
                6. Suggest follow-up actions if necessary
                
                Format the results clearly with sections.`;
                
                const cleanBase64 = base64Data.split(',')[1];
                
                loadingProgress = 60;
                const result = await model.generateContent([
                    prompt,
                    {
                        inlineData: {
                            data: cleanBase64,
                            mimeType: selectedFile.type
                        }
                    }
                ]);

                loadingProgress = 90;
                const response = await result.response;
                analysis = response.text();
            } 
            else if (selectedFile.type === 'application/pdf') {
                // Extract text from PDF
                loadingProgress = 50;
                textContent = await extractTextFromPDF(base64Data);
                loadingProgress = 70;
                
                // Enhanced prompt for PDF
                const prompt = `Analyze this blood test report as a medical professional. The content extracted from the PDF is:
                
                ${textContent}
                
                1. List all test parameters and their values
                2. Identify abnormal values (high or low)
                3. Explain what each abnormal value might indicate
                4. Provide a concise summary of overall health indications
                5. Note any values that require immediate attention
                6. Suggest follow-up actions if necessary
                
                Format the results clearly with sections.`;
                
                loadingProgress = 80;
                const result = await model.generateContent(prompt);
                const response = await result.response;
                analysis = response.text();
            }
            
            loadingProgress = 100;
        } catch (e: any) {
            console.error('Full error object:', e);
            let errorMessage = '';
            
            if (e.message?.includes('403')) {
                errorMessage = 'Access denied. Please verify your API key has proper permissions.';
            } else if (e.message?.includes('401')) {
                errorMessage = 'Invalid API key. Please check your API key.';
            } else if (e.message?.includes('429')) {
                errorMessage = 'Rate limit exceeded. Please try again later.';
            } else if (e.message?.includes('network')) {
                errorMessage = 'Network error. Please check your internet connection.';
            } else {
                errorMessage = e.message || 'An unexpected error occurred';
            }
            
            error = `Error analyzing report: ${errorMessage}`;
        } finally {
            setTimeout(() => {
                isAnalyzing = false;
                loadingProgress = 0;
            }, 500);
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

    async function extractTextFromPDF(base64Data: string): Promise<string> {
        try {
            // Remove the data URL prefix to get raw base64
            const base64Content = base64Data.split(',')[1];
            
            // Convert base64 to binary
            const binaryString = atob(base64Content);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Load PDF document
            const loadingTask = pdfjsLib.getDocument({ data: bytes.buffer });
            const pdf = await loadingTask.promise;
            
            let extractedText = '';
            
            // Extract text from each page
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map((item: any) => item.str)
                    .join(' ');
                extractedText += pageText + '\n\n';
            }
            
            return extractedText;
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            return "Failed to extract text from PDF. The analysis might be incomplete.";
        }
    }

    function resetForm() {
        selectedFile = null;
        fileName = '';
        fileSize = '';
        analysis = '';
        error = '';
    }
</script>

<div class="max-w-4xl mx-auto py-8 px-4 pt-24 md:pt-32">
    <h1 class="text-3xl font-bold mb-2">Blood Test Report Analyzer</h1>
    <p class="text-gray-600 mb-6">Upload your blood test report for AI-powered analysis and interpretation</p>

    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
                Upload Report (PDF, JPG, or PNG)
            </label>
            <div class="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500 transition-colors">
                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    on:change={handleFileSelect}
                    class="hidden"
                    bind:this={fileInput}
                />
                {#if !selectedFile}
                    <div on:click={() => fileInput.click()} class="cursor-pointer">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p class="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p class="text-xs text-gray-500">PDF, JPG or PNG up to 10MB</p>
                    </div>
                {:else}
                    <div class="text-left">
                        <div class="flex items-center">
                            <svg class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div class="ml-4 flex-1">
                                <div class="text-sm font-medium text-gray-900">{fileName}</div>
                                <div class="text-sm text-gray-500">{fileSize}</div>
                            </div>
                            <button 
                                on:click={resetForm}
                                class="text-red-500 hover:text-red-700"
                            >
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>

        {#if error}
            <div class="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                <div class="flex">
                    <svg class="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        {/if}

        {#if selectedFile}
            <button
                on:click={analyzeReport}
                disabled={isAnalyzing}
                class="w-full mb-6 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
                {#if isAnalyzing}
                    <div class="flex items-center justify-center">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                    </div>
                {:else}
                    Analyze Report
                {/if}
            </button>
        {/if}

        {#if isAnalyzing}
            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style="width: {loadingProgress}%"></div>
            </div>
        {/if}

        {#if analysis}
            <div class="mt-6">
                <h2 class="text-lg font-semibold mb-3">Analysis Results:</h2>
                <div class="bg-gray-50 p-5 rounded-md border border-gray-200 whitespace-pre-wrap prose max-w-none">
                    {@html analysis.replace(/\n/g, '<br>')}
                </div>
                <div class="mt-4 text-sm text-gray-500">
                    <p>Note: This analysis is provided by AI and should not replace professional medical advice. Always consult with your healthcare provider about your test results.</p>
                </div>
            </div>
        {/if}
    </div>
</div>