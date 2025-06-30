'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function EventBadge({
    showChatBubble = true,
    faceSize = 64,
    eyeSize = 4,
    smileWidth = 16,
    faceColor = '#f3a20f',
    bubbleColor = '#f97316',
    bubbleText = 'Just doing my thing',
    onTypingComplete,
    fixed = false,
    position = { bottom: '1.5rem', right: '1.5rem' },
    triggerHover = false,
}) {
    const leftEyeRef = useRef(null);
    const rightEyeRef = useRef(null);
    const smileRef = useRef(null);
    const faceRef = useRef(null);

    const [visibleText, setVisibleText] = useState('');
    const [showDots, setShowDots] = useState(true);

    const [isHovered, setIsHovered] = useState(false);

    const effectiveHover = triggerHover || isHovered;


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
        const delay = 100;
        const pauseAfterTyping = 600;

        let charIndex = 0;
        let typingInterval;

        const typeNextChar = () => {
            if (charIndex < bubbleText.length) {
                setVisibleText(bubbleText.substring(0, charIndex + 1));
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
    }, [bubbleText, onTypingComplete]);

    const badgeContent = (
        <div
            className={`flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap ${fixed ? 'fixed z-50' : ''
                }`}
            style={fixed ? position : {}}
        >
            {/* Face */}
            <div
                ref={faceRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative flex items-center justify-center rounded-full border border-black shadow-[0_0_0_3px_white] transition-all duration-300"
                style={{
                    width: faceSize,
                    height: faceSize,
                    backgroundColor: faceColor,
                }}
            >
                {/* Left Eye (always a dot) */}
                <div
                    ref={leftEyeRef}
                    className="absolute bg-black rounded-full transition-transform duration-75"
                    style={{
                        width: eyeSize,
                        height: eyeSize,
                        left: '30%',
                        top: '35%',
                    }}
                />

                {/* Right Eye (dot or X) */}
                {/* {!effectiveHover ? ( */}
                <div
                    ref={rightEyeRef}
                    className="absolute bg-black rounded-full transition-transform duration-75"
                    style={{
                        width: eyeSize,
                        height: eyeSize,
                        right: '30%',
                        top: '35%',
                    }}
                />
                {/* ) : (
                    <div className="absolute right-[28%] top-[35%] w-[8px] h-[1.5px] bg-black rotate-[-2deg] origin-center"></div>

                )} */}

                {/* Smile (simple or wide-toothy) */}
                {!effectiveHover ? (
                    <svg
                        ref={smileRef}
                        className="absolute bottom-[25%] left-1/2 -translate-x-1/2 transition-transform duration-75"
                        style={{ width: smileWidth }}
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
                ) : (
                    <svg
                        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 animate-smile-bounce"
                        width={faceSize * 0.4}
                        height="34"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Outer curved mouth shape */}
                        <path
                            d="M12 20 C10 55, 54 55, 52 20 C48 30, 16 30, 12 20 Z"
                            fill="#fff7dd"
                            stroke="black"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Upper teeth divider */}
                        <path
                            d="M14 28 C18 40, 46 40, 50 28"
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                    </svg>

                )}
            </div>


            {/* Chat Bubble */}
            {showChatBubble && (
                <div
                    className="relative text-white text-xs sm:text-sm md:text-base font-semibold rounded-2xl px-3 sm:px-4 py-1.5 sm:py-2 border border-black shadow-md max-w-[80vw] sm:max-w-none"
                    style={{ backgroundColor: bubbleColor }}
                >
                    {showDots ? (
                        <span className="animate-blink">...</span>
                    ) : (
                        <span>{visibleText}</span>
                    )}

                    {/* Bubble Tail */}
                    <div className="absolute left-[-7px] bottom-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[3px] border-b-transparent border-r-[10px] border-r-[#f97316]"></div>
                    <div
                        className="absolute left-[-6px] bottom-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[3.5px] border-b-transparent"
                        style={{ borderRightColor: bubbleColor }}
                    ></div>
                </div>
            )}
        </div>
    );

    return fixed ? createPortal(badgeContent, document.body) : badgeContent;
}
