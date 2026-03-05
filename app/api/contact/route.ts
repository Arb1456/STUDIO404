import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
    name: string;
    email: string;
    subject?: string;
    message: string;
    source?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validate required fields
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const webhookUrl = process.env.GHL_WEBHOOK_URL;

        if (!webhookUrl) {
            console.error('GHL_WEBHOOK_URL environment variable is not set');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Prepare payload for GHL webhook
        const ghlPayload = {
            name: body.name,
            email: body.email,
            subject: body.subject || 'General Inquiry',
            message: body.message,
            source: body.source || 'Website Contact Form',
            timestamp: new Date().toISOString(),
        };

        // Send to GHL webhook
        const ghlResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ghlPayload),
        });

        if (!ghlResponse.ok) {
            console.error('GHL webhook error:', ghlResponse.status, await ghlResponse.text());
            return NextResponse.json(
                { error: 'Failed to submit form. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Form submitted successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
