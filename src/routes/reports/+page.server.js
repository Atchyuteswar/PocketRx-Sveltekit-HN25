// src/routes/reports/+page.server.js
import { prisma } from '$lib/server/prisma';

export async function load({ locals }) {
  const userId = locals.user?.id;
  
  if (!userId) {
    return {
      reports: []
    };
  }
  
  const reports = await prisma.report.findMany({
    where: {
      userId
    },
    orderBy: {
      uploadDate: 'desc'
    },
    select: {
      id: true,
      fileName: true,
      uploadDate: true,
      labName: true,
      processed: true,
      patientInfo: {
        select: {
          name: true
        }
      },
      testResults: {
        select: {
          isAbnormal: true
        }
      }
    }
  });
  
  // Add calculated fields to make it easier to display
  const enrichedReports = reports.map(report => ({
    ...report,
    patientName: report.patientInfo?.name || 'Unknown',
    abnormalCount: report.testResults.filter(t => t.isAbnormal).length,
    totalTests: report.testResults.length
  }));
  
  return {
    reports: enrichedReports
  };
}