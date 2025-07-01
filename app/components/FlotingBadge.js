'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import EventBadge from './EventBadge';
import { useFaceHover } from '../context/FaceHoverContext';

const FlotingBadge = () => {
    const { triggerHover } = useFaceHover();
    const [isMainBadgeVisible, setIsMainBadgeVisible] = useState(true);
    const floatingRef = useRef(null);
    const effectiveHover = triggerHover;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsMainBadgeVisible(entry.isIntersecting);
            },
            {
                threshold: 0.2,
            }
        );

        const mainBadge = document.getElementById('main-event-badge');
        if (mainBadge) observer.observe(mainBadge);

        return () => {
            if (mainBadge) observer.unobserve(mainBadge);
        };
    }, []);

    useEffect(() => {
        if (!floatingRef.current) return;

        if (!isMainBadgeVisible) {
            // DELAYED entrance when main badge disappears
            gsap.to(floatingRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
                delay: 0.3, // 🎉 DELAYED entrance
            });
        } else {
            // INSTANT reverse animation when main badge is back
            gsap.to(floatingRef.current, {
                x: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                delay: 0, // no delay when hiding
            });
        }
    }, [isMainBadgeVisible]);

    return (
        <div
            ref={floatingRef}
            className="fixed top-[600px] md:left-14 left-3 z-[999] opacity-0 -translate-x-10"
        >
            <EventBadge showChatBubble={false} triggerHover={effectiveHover} />
        </div>
    );
};

export default FlotingBadge;
