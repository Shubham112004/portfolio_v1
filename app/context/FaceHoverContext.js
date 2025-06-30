'use client';
import { createContext, useContext, useState } from 'react';

const FaceHoverContext = createContext();

export const useFaceHover = () => useContext(FaceHoverContext);

export const FaceHoverProvider = ({ children }) => {
    const [triggerHover, setTriggerHover] = useState(false);

    return (
        <FaceHoverContext.Provider value={{ triggerHover, setTriggerHover }}>
            {children}
        </FaceHoverContext.Provider>
    );
};
