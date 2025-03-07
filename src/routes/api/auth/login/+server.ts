import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST({ request }) {
    try {
        const { email, password } = await request.json();

        // Test database connection
        await prisma.$connect();

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Don't send the password back
        const { password: _, ...userWithoutPassword } = user;

        return json({
            success: true,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Database connection error:', error);
        return json({
            success: false,
            message: 'Database connection failed. Please try again later.'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
