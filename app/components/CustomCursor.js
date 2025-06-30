'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [cursorType, setCursorType] = useState('default'); // 'default' | 'link' | 'text'
    const [hideCursor, setHideCursor] = useState(false);


    useEffect(() => {
        const cursor = document.getElementById('custom-cursor');

        const moveCursor = (e) => {
            if (cursor) {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                cursor.style.opacity = '1';
            }
        };

        const hideCursor = (e) => {
            if (!e.relatedTarget && cursor) {
                cursor.style.opacity = '0';
            }
        };

        const showCursor = () => {
            if (cursor) cursor.style.opacity = '1';
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            if (
                target.tagName === 'A' ||
                target.closest('a') ||
                target.getAttribute('role') === 'link'
            ) {
                setCursorType('link');
            } else if (
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'INPUT' ||
                window.getSelection()?.toString().length > 0
            ) {
                setCursorType('text');
            } else {
                setCursorType('default');
            }
        };

        const handleMouseOut = () => {
            setCursorType('default');
        };

        document.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseout', hideCursor);
        document.addEventListener('mouseenter', showCursor);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseout', hideCursor);
            document.removeEventListener('mouseenter', showCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <div
            id="custom-cursor"
            className={`hidden md:block pointer-events-none fixed top-0 left-0 z-[9999] w-6 h-6 transition-transform duration-75 hideCursor ? 'opacity-0' : 'opacity-100'`}
        >
            {cursorType === 'link' ? (
                // Link Hover SVG
                <img src="/hoverCursor.svg" alt="hoverCursor" />
            ) : cursorType === 'text' ? (
                // Text Selection SVG (or beam-like icon)
                <img src='/selectCursor.svg' alt='selectCursor' />
            ) : (
                // Default Cursor SVG
                <svg
                    width="23"
                    height="28"
                    viewBox="0 0 24 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 0H0V34H4V32H6V30H8V28H10V32H12V36H14V38H18V36H20V32H18V28H16V26H24V22H22V20H20V18H18V16H16V14H14V12H12V10H10V8H8V6H6V4H4V2H2V0Z"
                        fill="#131313"
                    />
                    <path
                        d="M4 4H2V32H4V30H6V28H8V26H10V28H12V32H14V36H18V32H16V28H14V24H22V22H20V20H18V18H16V16H14V14H12V12H10V10H8V8H6V6H4V4Z"
                        fill="#FFFEFB"
                    />
                </svg>
            )}
        </div>
    );
}
