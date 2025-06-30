// app/api/contact/route.js
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

        // Send Email with Nodemailer
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS,
        //     },
        // });

        // const mailOptions = {
        //     from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        //     to: process.env.EMAIL_TO,
        //     subject: `New Contact Form Submission: ${subject}`,
        //     html: `
        //         <h3>From: ${from}</h3>
        //         <h4>Subject: ${subject}</h4>
        //         <p>${message}</p>
        //     `,
        // };

        // await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, data: newMsg }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
