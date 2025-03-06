<!-- src/routes/upload/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { fly } from 'svelte/transition';
  
    let files;
    let uploading = false;
    let uploadSuccess = false;
    let uploadError = null;
    let preview = null;
  
    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file && file.type === 'application/pdf') {
        files = event.target.files;
        
        // Create a preview URL
        preview = URL.createObjectURL(file);
        uploadError = null;
      } else {
        files = null;
        preview = null;
        uploadError = "Please select a valid PDF file";
      }
    }
  
    function resetForm() {
      files = null;
      preview = null;
      uploadSuccess = false;
      uploadError = null;
    }
  </script>
  
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Upload Blood Test Report</h1>
      
      <form 
        method="POST" 
        action="?/uploadPdf" 
        enctype="multipart/form-data"
        use:enhance={({ form, data, action, cancel }) => {
          uploading = true;
          
          return async ({ result, update }) => {
            uploading = false;
            
            if (result.type === 'success') {
              uploadSuccess = true;
              await invalidateAll();
            } else if (result.type === 'error') {
              uploadError = result.error?.message || "Upload failed";
            }
            
            update();
          };
        }}
      >
        <div class="mb-6">
          <label for="pdfFile" class="block text-sm font-medium text-gray-700 mb-2">
            Select Blood Test Report (PDF)
          </label>
          
          {#if !files}
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 transition cursor-pointer"
              on:click={() => document.getElementById('pdfFile').click()}
              on:keydown={(e) => e.key === 'Enter' && document.getElementById('pdfFile').click()}
              tabindex="0"
              role="button"
              aria-label="Click to select a PDF file"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="mt-2 text-sm text-gray-600">Drag and drop a PDF file here, or click to select</p>
            </div>
          {:else}
            <div class="flex flex-col items-center border rounded-lg p-4 bg-gray-50">
              <div class="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <span class="ml-2 text-sm font-medium text-gray-700 truncate">
                  {files[0].name}
                </span>
              </div>
              
              {#if preview}
                <iframe 
                  src={preview} 
                  title="PDF Preview" 
                  class="w-full h-64 mb-4 border border-gray-300 rounded"
                ></iframe>
              {/if}
              
              <button 
                type="button" 
                class="text-sm text-red-600 hover:text-red-800" 
                on:click={resetForm}
              >
                Remove file
              </button>
            </div>
          {/if}
          
          <input 
            id="pdfFile" 
            name="pdfFile" 
            type="file" 
            accept="application/pdf" 
            on:change={handleFileSelect} 
            class="hidden" 
            required
          />
        </div>
        
        {#if uploadError}
          <div class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md" transition:fly={{ y: -10, duration: 300 }}>
            {uploadError}
          </div>
        {/if}
        
        {#if uploadSuccess}
          <div class="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md" transition:fly={{ y: -10, duration: 300 }}>
            Report uploaded successfully! Processing your results...
            <a href="/reports" class="ml-2 underline">View your reports</a>
          </div>
        {/if}
        
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!files || uploading}
          >
            {#if uploading}
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            {:else}
              Upload Report
            {/if}
          </button>
        </div>
      </form>
    </div>
  </div>