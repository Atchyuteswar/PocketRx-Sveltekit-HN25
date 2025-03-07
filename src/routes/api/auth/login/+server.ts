import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return json({ message: 'Invalid credentials' }, { status: 401 });
        }

        return json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        return json({ message: 'Server error' }, { status: 500 });
    }
};
