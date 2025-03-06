import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return json({ message: 'Email already registered' }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user and health profile
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                healthProfile: {
                    create: {
                        dateOfBirth: new Date(data.dateOfBirth),
                        gender: data.gender,
                        height: parseFloat(data.height),
                        weight: parseFloat(data.weight),
                        bloodType: data.bloodType,
                        allergies: data.allergies,
                        medications: data.medications
                    }
                }
            }
        });

        return json({ message: 'Registration successful' }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
    }
};
