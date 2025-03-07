import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        await prisma.$connect();
        return json({ connected: true });
    } catch (error) {
        console.error('Database connection check failed:', error);
        return json({ connected: false });
    } finally {
        await prisma.$disconnect();
    }
}
