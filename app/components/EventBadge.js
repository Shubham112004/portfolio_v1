'use client';

import { useEffect, useRef, useState } from 'react';

export default function EventBadge({ onTypingComplete }) {
    const leftEyeRef = useRef(null);
    const rightEyeRef = useRef(null);
    const smileRef = useRef(null);
    const faceRef = useRef(null);

    const [visibleText, setVisibleText] = useState('');
    const [showDots, setShowDots] = useState(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const face = faceRef.current;
            const eyes = [leftEyeRef.current, rightEyeRef.current];
            const smile = smileRef.current;

            if (!face || !eyes[0] || !eyes[1] || !smile) return;

            const rect = face.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(6, Math.sqrt(deltaX ** 2 + deltaY ** 2) / 20);

            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            eyes.forEach((eye) => {
                eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });

            smile.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const textArray = [
            'Just doing my thing'
        ];

        const delay = 100;
        const pauseBetweenTexts = 1000;

        let currentTextIndex = 0;
        let charIndex = 0;
        let typingInterval;
        let pauseTimeout;

        const typeNextChar = () => {
            const currentText = textArray[currentTextIndex];

            if (charIndex < currentText.length) {
                setVisibleText(currentText.substring(0, charIndex + 1)); // Always slice up to current char
                charIndex++;
            } else {
                clearInterval(typingInterval);

                // Wait before starting next string
                if (currentTextIndex < textArray.length - 1) {
                    pauseTimeout = setTimeout(() => {
                        currentTextIndex++;
                        charIndex = 0;
                        setVisibleText('');
                        typingInterval = setInterval(typeNextChar, delay);
                    }, pauseBetweenTexts);
                }
            }
        };

        const dotsTimer = setTimeout(() => {
            setShowDots(false);
            typingInterval = setInterval(typeNextChar, delay);
        }, 700);

        return () => {
            clearTimeout(dotsTimer);
            clearTimeout(pauseTimeout);
            clearInterval(typingInterval);
        };
    }, []);

    useEffect(() => {
        const textArray = ['Just doing my thing'];
        const delay = 100;
        const pauseAfterTyping = 600;

        let charIndex = 0;
        let typingInterval;

        const typeNextChar = () => {
            const currentText = textArray[0];

            if (charIndex < currentText.length) {
                setVisibleText(currentText.substring(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    if (onTypingComplete) onTypingComplete();
                }, pauseAfterTyping);
            }
        };

        const dotsTimer = setTimeout(() => {
            setShowDots(false);
            typingInterval = setInterval(typeNextChar, delay);
        }, 700);

        return () => {
            clearTimeout(dotsTimer);
            clearInterval(typingInterval);
        };
    }, [onTypingComplete]);

    return (
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
            {/* Sun Face */}
            <div
                ref={faceRef}
                className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-[1px] border-black shadow-[0_0_0_3px_white]"
                style={{ backgroundColor: '#f3a20f' }}
            >
                {/* Left Eye */}
                <div
                    ref={leftEyeRef}
                    className="absolute w-[0.25rem] h-[0.25rem] bg-black rounded-full left-[30%] top-[35%] transition-transform duration-75"
                />
                {/* Right Eye */}
                <div
                    ref={rightEyeRef}
                    className="absolute w-[0.25rem] h-[0.25rem] bg-black rounded-full right-[30%] top-[35%] transition-transform duration-75"
                />
                {/* Smile */}
                <svg
                    ref={smileRef}
                    className="absolute bottom-[25%] left-1/2 -translate-x-1/2 transition-transform duration-75 w-[16px] sm:w-[20px]"
                    height="10"
                    viewBox="0 0 20 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 2C4 6 16 6 18 2"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Chat Bubble with Typewriter Text */}
            <div className="relative bg-orange-500 text-white text-xs sm:text-sm md:text-base font-semibold rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 border-[1px] border-black shadow-md max-w-[80vw] sm:max-w-none">
                {showDots ? (
                    <span className="animate-blink">...</span>
                ) : (
                    <span>{visibleText}</span>
                )}

                {/* Bubble Tail */}
                <div className="absolute left-[-7px] bottom-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[3px] border-b-transparent border-r-[10px] border-r-gray-800"></div>
                <div className="absolute left-[-6px] bottom-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[3.5px] border-b-transparent border-r-[10px] border-r-orange-500"></div>
            </div>
        </div>
    );
}
