'use client';

import { useEffect, useState } from 'react';
import EventBadge from './EventBadge';
import FlotingBadge from './FlotingBadge';

export default function LoadingScreen({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [startExitAnim, setStartExitAnim] = useState(false);

    const handleTypingComplete = () => {
        setStartExitAnim(true); // trigger exit animation
        setTimeout(() => {
            setIsLoading(false); // show main
            setTimeout(() => setIsVisible(false), 300); // cleanup
        }, 200); // wait for exit anim
    };



    return (
        <>
            {isVisible && (
                <div
                    className={`
                        fixed inset-0 z-50 bg-[#f3ead2] flex items-center justify-center
                        transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]
                        ${startExitAnim ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
                    `}
                >
                    <EventBadge onTypingComplete={handleTypingComplete} />
                </div>
            )}
            {isLoading == false && <FlotingBadge />}
            <div
                className={`
                    transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] transform
                    ${!isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
            >
                {children}
            </div>
        </>
    );
}
