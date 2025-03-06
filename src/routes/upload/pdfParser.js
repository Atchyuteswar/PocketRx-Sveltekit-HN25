// src/routes/upload/pdfParser.js
import pdfjs from 'pdfjs-dist';

export class PDFParser {
  constructor() {
    // Initialize PDF.js worker
    const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.mjs');
    if (typeof window !== 'undefined' && 'Worker' in window) {
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    }
    
    // Define known lab test patterns and their normal ranges
    this.testPatterns = {
      // Complete Blood Count (CBC)
      'hemoglobin': {
        regex: /hemoglobin|hgb|hb/i,
        unit: 'g/dL',
        normalRange: {
          male: [13.5, 17.5],
          female: [12.0, 15.5]
        },
        specialty: 'Hematologist'
      },
      'wbc': {
        regex: /white\s*blood\s*cells|wbc|leukocytes/i,
        unit: '×10^9/L',
        normalRange: {
          default: [4.5, 11.0]
        },
        specialty: 'Hematologist'
      },
      'rbc': {
        regex: /red\s*blood\s*cells|rbc|erythrocytes/i,
        unit: '×10^12/L',
        normalRange: {
          male: [4.5, 5.9],
          female: [4.1, 5.1]
        },
        specialty: 'Hematologist'
      },
      'platelets': {
        regex: /platelets|plt/i,
        unit: '×10^9/L',
        normalRange: {
          default: [150, 450]
        },
        specialty: 'Hematologist'
      },
      
      // Lipid Panel
      'cholesterol': {
        regex: /total\s*cholesterol|cholesterol/i,
        unit: 'mg/dL',
        normalRange: {
          default: [0, 200] // Less than 200 is desirable
        },
        specialty: 'Cardiologist'
      },
      'ldl': {
        regex: /ldl|low\s*density\s*lipoprotein/i,
        unit: 'mg/dL',
        normalRange: {
          default: [0, 100] // Less than 100 is optimal
        },
        specialty: 'Cardiologist'
      },
      'hdl': {
        regex: /hdl|high\s*density\s*lipoprotein/i,
        unit: 'mg/dL',
        normalRange: {
          male: [40, 999], // Greater than 40 is desirable
          female: [50, 999] // Greater than 50 is desirable
        },
        specialty: 'Cardiologist'
      },
      'triglycerides': {
        regex: /triglycerides|tg/i,
        unit: 'mg/dL',
        normalRange: {
          default: [0, 150] // Less than 150 is normal
        },
        specialty: 'Cardiologist'
      },
      
      // Metabolic Panel
      'glucose': {
        regex: /glucose|glu|fasting\s*blood\s*sugar|fbs/i,
        unit: 'mg/dL',
        normalRange: {
          default: [70, 99] // Fasting
        },
        specialty: 'Endocrinologist'
      },
      'hba1c': {
        regex: /hba1c|glycated\s*hemoglobin|a1c/i,
        unit: '%',
        normalRange: {
          default: [4.0, 5.6]
        },
        specialty: 'Endocrinologist'
      },
      'creatinine': {
        regex: /creatinine|cre/i,
        unit: 'mg/dL',
        normalRange: {
          male: [0.74, 1.35],
          female: [0.59, 1.04]
        },
        specialty: 'Nephrologist'
      },
      'bun': {
        regex: /blood\s*urea\s*nitrogen|bun/i,
        unit: 'mg/dL',
        normalRange: {
          default: [7, 20]
        },
        specialty: 'Nephrologist'
      }
      // Add more patterns as needed
    };
  }

  async parsePDF(filePath) {
    try {
      // Load the PDF document
      const data = new Uint8Array(await this.readFile(filePath));
      const loadingTask = pdfjs.getDocument({ data });
      const pdf = await loadingTask.promise;
      
      // Extract text from all pages
      const textContent = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        textContent.push(strings.join(' '));
      }
      
      const fullText = textContent.join('\n');
      console.log('Extracted PDF text:', fullText);
      
      // Extract test results
      return this.extractTestResults(fullText);
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF file');
    }
  }

  async readFile(filePath) {
    return new Promise((resolve, reject) => {
      const fs = require('fs');
      fs.readFile(filePath, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  extractTestResults(text) {
    // Initialize results object
    const results = {
      testResults: [],
      abnormalResults: [],
      recommendedSpecialists: new Set()
    };
    
    // Process each known test pattern
    for (const [testName, testInfo] of Object.entries(this.testPatterns)) {
      const regex = new RegExp(
        `(${testInfo.regex.source})\\s*[:\\-]?\\s*([\\d\\.]+)\\s*(?:${testInfo.unit})?`, 'i'
      );
      
      const match = text.match(regex);
      if (match) {
        const value = parseFloat(match[2]);
        
        // Determine if the value is within normal range
        const normalRange = testInfo.normalRange.default || testInfo.normalRange.male;
        const isAbnormal = value < normalRange[0] || value > normalRange[1];
        
        // Create test result object
        const testResult = {
          name: testName,
          value: value,
          unit: testInfo.unit,
          normalRange: normalRange,
          isAbnormal: isAbnormal,
          status: isAbnormal ? (value < normalRange[0] ? 'Low' : 'High') : 'Normal'
        };
        
        results.testResults.push(testResult);
        
        // Add to abnormal results if needed
        if (isAbnormal) {
          results.abnormalResults.push(testResult);
          results.recommendedSpecialists.add(testInfo.specialty);
        }
      }
    }
    
    // Convert Set to Array for recommended specialists
    results.recommendedSpecialists = Array.from(results.recommendedSpecialists);
    
    // Try to extract patient information
    const patientInfo = this.extractPatientInfo(text);
    if (patientInfo) {
      results.patientInfo = patientInfo;
    }
    
    // Try to extract lab information
    const labInfo = this.extractLabInfo(text);
    if (labInfo) {
      results.labInfo = labInfo;
    }
    
    return results;
  }

  extractPatientInfo(text) {
    const patientInfo = {};
    
    // Extract patient name
    const nameMatch = text.match(/(?:patient|name)\s*[:\-]?\s*([A-Za-z\s\.]+)/i);
    if (nameMatch) {
      patientInfo.name = nameMatch[1].trim();
    }
    
    // Extract patient age
    const ageMatch = text.match(/(?:age|years|yrs)\s*[:\-]?\s*(\d+)/i);
    if (ageMatch) {
      patientInfo.age = parseInt(ageMatch[1]);
    }
    
    // Extract patient gender
    const genderMatch = text.match(/(?:gender|sex)\s*[:\-]?\s*([A-Za-z]+)/i);
    if (genderMatch) {
      patientInfo.gender = genderMatch[1].trim().toLowerCase();
    }
    
    // Extract sample collection date
    const dateMatch = text.match(/(?:date|collected|sample\s*date)\s*[:\-]?\s*([A-Za-z0-9\s,\.\/]+)/i);
    if (dateMatch) {
      patientInfo.collectionDate = dateMatch[1].trim();
    }
    
    return Object.keys(patientInfo).length > 0 ? patientInfo : null;
  }

  extractLabInfo(text) {
    const labInfo = {};
    
    // Extract lab name
    const labMatch = text.match(/(?:laboratory|lab|report\s*from)\s*[:\-]?\s*([A-Za-z\s\.]+)/i);
    if (labMatch) {
      labInfo.name = labMatch[1].trim();
    }
    
    // Extract report ID if available
    const reportIdMatch = text.match(/(?:report\s*id|sample\s*id|specimen\s*id)\s*[:\-]?\s*([A-Za-z0-9\-]+)/i);
    if (reportIdMatch) {
      labInfo.reportId = reportIdMatch[1].trim();
    }
    
    return Object.keys(labInfo).length > 0 ? labInfo : null;
  }
}