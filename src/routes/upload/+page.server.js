// src/routes/upload/+page.server.js
import { fail } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { PDFParser } from './pdfParser';
import { prisma } from '$lib/server/prisma';

export const actions = {
  uploadPdf: async ({ request, locals }) => {
    try {
      // Get user ID from session (assuming you have authentication set up)
      const userId = locals.user?.id;
      if (!userId) {
        return fail(401, { message: 'You must be logged in to upload reports' });
      }
      
      const formData = await request.formData();
      const pdfFile = formData.get('pdfFile');
      
      if (!pdfFile) {
        return fail(400, { message: 'No PDF file was uploaded' });
      }
      
      if (pdfFile.type !== 'application/pdf') {
        return fail(400, { message: 'File must be a PDF' });
      }
      
      // Create a unique filename
      const timestamp = Date.now();
      const originalName = pdfFile.name;
      const fileName = `${userId}_${timestamp}_${originalName.replace(/\s+/g, '_')}`;
      
      // Save file to disk (in a real app, you might use cloud storage)
      const uploadsDir = path.join(process.cwd(), 'uploads');
      
      // Ensure directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      const filePath = path.join(uploadsDir, fileName);
      
      // Convert blob to buffer and write to file
      const arrayBuffer = await pdfFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(filePath, buffer);
      
      // Parse the PDF file to extract blood test data
      const pdfParser = new PDFParser();
      const reportData = await pdfParser.parsePDF(filePath);
      
      // Save the report and extracted data to MongoDB using Prisma
      const report = await prisma.report.create({
        data: {
          user: {
            connect: { id: userId }
          },
          filePath,
          fileName: originalName,
          labName: reportData.labInfo?.name,
          reportId: reportData.labInfo?.reportId,
          collectionDate: reportData.patientInfo?.collectionDate ? new Date(reportData.patientInfo.collectionDate) : null,
          processed: true,
          
          // Create patient info if available
          patientInfo: reportData.patientInfo ? {
            create: {
              name: reportData.patientInfo.name,
              age: reportData.patientInfo.age,
              gender: reportData.patientInfo.gender,
              otherDetails: reportData.patientInfo.otherDetails || {}
            }
          } : undefined,
          
          // Create test results
          testResults: {
            create: reportData.testResults.map(test => ({
              testName: test.name,
              value: test.value,
              unit: test.unit,
              normalRangeMin: test.normalRange[0],
              normalRangeMax: test.normalRange[1],
              isAbnormal: test.isAbnormal,
              status: test.status
            }))
          },
          
          // Create specialist recommendations if available
          recommendations: reportData.recommendedSpecialists?.length > 0 ? {
            create: reportData.recommendedSpecialists.map(specialist => ({
              name: specialist,
              reason: `Recommended based on abnormal ${specialist.toLowerCase().includes('cardio') ? 'heart' : specialist.toLowerCase().includes('hema') ? 'blood' : specialist.toLowerCase().includes('endo') ? 'sugar' : 'test'} results`
            }))
          } : undefined
        }
      });
      
      return {
        success: true,
        reportId: report.id
      };
    } catch (error) {
      console.error('Upload error:', error);
      return fail(500, { message: 'Failed to process the PDF file' });
    }
  }
};