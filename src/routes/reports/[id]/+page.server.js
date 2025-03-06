// src/routes/reports/[id]/+page.server.js
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function load({ params, locals }) {
  const reportId = params.id;
  const userId = locals.user?.id;
  
  if (!userId) {
    throw error(401, 'You must be logged in to view reports');
  }
  
  const report = await prisma.report.findUnique({
    where: {
      id: reportId
    },
    include: {
      patientInfo: true,
      testResults: true,
      recommendations: true
    }
  });
  
  if (!report) {
    throw error(404, 'Report not found');
  }
  
  // Check if this report belongs to the logged-in user
  if (report.userId !== userId) {
    throw error(403, 'You do not have permission to view this report');
  }
  
  return {
    report
  };
}