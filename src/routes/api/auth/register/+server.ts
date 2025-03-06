import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { hashPassword, createJWT } from '$lib/server/auth';

export async function POST({ request, cookies }) {
    const userData = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: { email: userData.email }
    });

    if (existingUser) {
        return json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(userData.password);

    const user = await prisma.user.create({
        data: {
            email: userData.email,
            password: hashedPassword,
            profile: {
                create: {
                    name: userData.name,
                    dateOfBirth: new Date(userData.dateOfBirth),
                    gender: userData.gender,
                    height: parseFloat(userData.height),
                    weight: parseFloat(userData.weight),
                    bloodType: userData.bloodType,
                    allergies: userData.allergies,
                    medications: userData.medications
                }
            }
        }
    });

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
