import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { verifyPassword, createJWT } from '$lib/server/auth';

export async function POST({ request, cookies }) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
        return json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const token = createJWT(user.id);
    cookies.set('auth_token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return json({ success: true });
}
