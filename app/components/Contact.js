'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Link from 'next/link';
import { Github, Linkedin, DownloadIcon, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFaceHover } from '../context/FaceHoverContext';

export default function ContactSection() {
    const [to, setTo] = useState('shubhamgaikwad2k4@gmail.com'); // your email
    const [from, setFrom] = useState(''); // user email
    const [subject, setSubject] = useState('We’d Love to Work With You!');
    const [errors, setErrors] = useState({ from: '', message: '' });
    const [loading, setLoading] = useState(false);

    const editor = useEditor({
        extensions: [StarterKit, Bold, Italic, Underline],
        content: '',
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose lg:prose-lg focus:outline-none w-full min-h-[180px] text-black',
            },
        },
    });

    const validateEmail = (email) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleBlur = () => {
        const html = editor?.getHTML() || '';
        const messageText = html.replace(/<[^>]+>/g, '');

        const newErrors = {
            from: !from.trim()
                ? 'Email is required.'
                : !validateEmail(from)
                    ? 'Enter a valid email.'
                    : '',
            message: !messageText.trim() ? 'Message is required.' : '',
        };

        setErrors(newErrors);
    };


    const applyFormat = (command) => {
        editor?.chain().focus()[command]().run();
    };

    // Inside your ContactSection component:


    const handleSend = async () => {
        const html = editor?.getHTML() || '';
        const messageText = html.replace(/<[^>]+>/g, '');

        if (!from.trim() || !messageText.trim()) {
            toast.error('Please fill in both your email and message.');
            return;
        }

        const loadingToast = toast.loading('Sending your message...');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from, subject, message: messageText }),
            });

            const json = await res.json();

            toast.dismiss(loadingToast);

            if (!res.ok) throw new Error(json.error || 'Something went wrong');

            toast.success('Thanks! Your message has been sent ✨');
            setFrom('');
            editor.commands.clearContent();
        } catch (err) {
            toast.dismiss(loadingToast);
            console.error(err);
            toast.error(`Error: ${err.message}`);
        }
    };

    const { setTriggerHover } = useFaceHover();



    return (
        <section id='contact' className="w-full min-h-screen bg-[#f3ead2] text-[#1a1a1a] px-6 py-16 md:px-20 flex flex-col justify-center items-center">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8 flex flex-col justify-center h-full">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-bold font-sugar leading-tight text-[#1a1a1a]">
                            👋 Say Hello!
                        </h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-700">
                            Got an idea? Let’s make it happen. Whether it’s a freelance gig or a collab, I’m all ears.
                        </p>
                    </div>

                    <div className="space-y-4 text-base md:text-lg text-[#1a1a1a]">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">📞</span>
                            <span className="font-medium">+91 96049 00934</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">📧</span>
                            <span className="font-medium">shubhamgaikwad2k4@gmail.com</span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center space-x-4 pt-2">
                        <a
                            href="https://github.com/shubham112004"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shubham2k24"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        {/* Button */}
                        <div onMouseEnter={() => setTriggerHover(true)} onMouseLeave={() => setTriggerHover(false)} className="inline-block text-[16px] group transition-transform duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]">
                            <Link
                                href="/shubham-gaikwad.pdf" target='_blank'
                                className="inline-flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] drop-shadow-[0px_6px_0px_#80785f] group-hover:drop-shadow-[0px_2px_0px_#80785f] group-hover:translate-y-[4px] bg-pink-400 text-black font-quicksand font-semibold px-4 py-2 rounded-full border border-black"
                            >
                                Resume <DownloadIcon size={20} />
                            </Link>
                        </div>
                    </div>

                </div>


                {/* Right Column: Gmail-style Compose */}
                <div className="bg-white border border-black rounded-lg shadow-[6px_6px_0_#80785f] p-6 space-y-4">

                    {/* From Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            From <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="yourname@gmail.com"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            onBlur={handleBlur}
                            className="w-full border border-gray-400 rounded px-3 py-2 text-sm"
                        />
                        {errors.from && <p className="text-red-500 text-sm mt-1">{errors.from}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium mb-1">To</label>
                        <input
                            type="email"
                            value={to}
                            disabled
                            readOnly
                            className="w-full border border-gray-400 rounded px-3 py-2 bg-gray-100 text-sm text-gray-500"
                        />
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Subject</label>
                        <input
                            type="text"
                            placeholder="Enter subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full border border-gray-400 rounded px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Message Editor */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2 mb-2">
                            <button
                                onClick={() => editor?.chain().focus().toggleBold().run()}
                                className="px-2 py-1 text-sm font-bold border border-gray-400 rounded"
                            >
                                B
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleItalic().run()}
                                className="px-2 py-1 text-sm italic border border-gray-400 rounded"
                            >
                                I
                            </button>
                            <button
                                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                className="px-2 py-1 text-sm underline border border-gray-400 rounded"
                            >
                                U
                            </button>
                        </div>
                        <div className="border border-gray-400 rounded bg-white p-2">
                            <EditorContent editor={editor} onBlur={handleBlur} />
                        </div>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>


                    {/* Send Button */}
                    <div onMouseEnter={() => setTriggerHover(true)} onMouseLeave={() => setTriggerHover(false)} className="inline-block text-[16px] group transition-transform duration-300 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]">
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className={`inline-flex items-center gap-2 transition-all duration-300 drop-shadow-[0px_6px_0px_#d2ccb6] group-hover:drop-shadow-[0px_2px_0px_#d2ccb6] group-hover:translate-y-[4px] bg-pink-400 text-black font-quicksand font-semibold px-4 py-2 rounded-full border border-black ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading ? 'Sending...' : 'Send'} <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
}
