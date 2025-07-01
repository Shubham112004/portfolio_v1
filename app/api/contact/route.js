import { NextResponse } from 'next/server';
import connectDB from '../../lib/db.js';
import Message from '../../models/Message.js';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { from, subject, message } = await req.json();

        if (!from || !message) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
        }

        await connectDB();
        const newMsg = await Message.create({ from, subject, message });

        // Now send emails in background
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailToOwner = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO,
            subject: `New Contact Form Submission: ${subject}`,
            html: `<h3>From: ${from}</h3><h4>Subject: ${subject}</h4><p>${message}</p>`,
        };

        const autoReplyOptions = {
            from: `"Shubham Gaikwad" <${process.env.EMAIL_USER}>`,
            to: from,
            subject: `Thanks for reaching out!`,
            html: `
        <p>Hey there,</p>
        <p>Thanks for getting in touch with me! 🙌</p>
        <p>I’ve received your message and will get back to you as soon as I can.</p>
        <br/>
        <p>Cheers,<br/>Shubham Gaikwad</p>
        <p><em>This is an automated email. Please do not reply.</em></p>
    `,
        };

        // ✅ Await the actual send operation
        await Promise.allSettled([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(autoReplyOptions)
        ]);

        // Now respond
        return NextResponse.json({ success: true }, { status: 200 });



    } catch (err) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
