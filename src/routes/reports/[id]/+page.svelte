<!-- src/routes/reports/[id]/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    
    export let data;
    
    $: report = data.report;
    $: abnormalTests = report?.testResults?.filter(test => test.isAbnormal) || [];
    $: normalTests = report?.testResults?.filter(test => !test.isAbnormal) || [];
    
    function getStatusColor(status) {
      switch(status) {
        case 'High': return 'text-red-600 bg-red-50';
        case 'Low': return 'text-blue-600 bg-blue-50';
        default: return 'text-green-600 bg-green-50';
      }
    }
    
    function getStatusIcon(status) {
      switch(status) {
        case 'High':
          return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                  </svg>`;
        case 'Low':
          return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>`;
        default:
          return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>`;
      }
    }
  </script>
  
  <div class="max-w-4xl mx-auto p-6">
    <!-- Report Header -->
    <div class="bg-white rounded-lg shadow-md p-8 mb-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Blood Test Report Summary</h1>
          {#if report?.patientInfo}
            <div class="mt-2 text-gray-600">
              <p>
                {#if report.patientInfo.name}
                  <span class="font-medium">Patient:</span> {report.patientInfo.name}
                {/if}
                {#if report.patientInfo.age}
                  • <span class="font-medium">Age:</span> {report.patientInfo.age}
                {/if}
                {#if report.patientInfo.gender}
                  • <span class="font-medium">Gender:</span> {report.patientInfo.gender.charAt(0).toUpperCase() + report.patientInfo.gender.slice(1)}
                {/if}
              </p>
              {#if report.patientInfo.collectionDate}
                <p class="mt-1">
                  <span class="font-medium">Sample Date:</span> {report.patientInfo.collectionDate}
                </p>
              {/if}
            </div>
          {/if}
        </div>
        
        {#if report?.labInfo?.name}
          <div class="text-right">
            <div class="text-sm text-gray-500">Lab: {report.labInfo.name}</div>
            {#if report.labInfo.reportId}
              <div class="text-sm text-gray-500">Report ID: {report.labInfo.reportId}</div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Abnormal Results Section -->
    {#if abnormalTests.length > 0}
      <div class="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Abnormal Results</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each abnormalTests as test}
            <div class="border rounded-lg p-4 hover:shadow-md transition">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-gray-700 capitalize">{test.name.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <span class={`px-2 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(test.status)}`}>
                  {@html getStatusIcon(test.status)}
                  <span class="ml-1">{test.status}</span>
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Your value:</span>
                <span class="font-medium">{test.value} {test.unit}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Normal range:</span>
                <span>{test.normalRange[0]} - {test.normalRange[1]} {test.unit}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Normal Results Section -->
    {#if normalTests.length > 0}
      <div class="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Normal Results</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each normalTests as test}
            <div class="border rounded-lg p-4 hover:shadow-md transition">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-semibold text-gray-700 capitalize">{test.name.replace(/([A-Z])/g, ' $1').trim()}</h3>
                <span class={`px-2 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(test.status)}`}>
                  {@html getStatusIcon(test.status)}
                  <span class="ml-1">{test.status}</span>
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Your value:</span>
                <span class="font-medium">{test.value} {test.unit}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Recommendations Section -->
    {#if report?.recommendedSpecialists && report.recommendedSpecialists.length > 0}
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Recommendations</h2>
        <div class="mb-4">
          <p class="text-gray-700">Based on your test results, we recommend consulting with:</p>
          <ul class="mt-3 space-y-3">
            {#each report.recommendedSpecialists as specialist}
              <li class="flex items-start">
                <svg class="h-5 w-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="ml-2 text-gray-700">A <span class="font-medium">{specialist}</span> - for further evaluation of your {specialist.toLowerCase().includes('cardio') ? 'heart-related markers' : specialist.toLowerCase().includes('hema') ? 'blood cell counts' : specialist.toLowerCase().includes('endo') ? 'blood sugar levels' : specialist.toLowerCase().includes('nephro') ? 'kidney function markers' : 'test results'}</span>
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p class="text-sm text-blue-700">
            <strong>Note:</strong> These recommendations are generated automatically based on your test results. Always consult with your primary care physician before scheduling specialist appointments.
          </p>
        </div>
      </div>
    {/if}
  </div>