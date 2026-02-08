"use client";

import { useState, useCallback } from "react";
import styles from "./TextScramble.module.css";

interface TextScrambleProps {
    children: string;
    className?: string;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({ children, className = "" }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback(() => {
        if (isScrambling) return;
        setIsScrambling(true);

        const originalText = children;
        let iteration = 0;
        const maxIterations = originalText.length;

        const interval = setInterval(() => {
            setDisplayText(
                originalText
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            iteration += 1 / 3;

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setDisplayText(originalText);
                setIsScrambling(false);
            }
        }, 30);
    }, [children, isScrambling]);

    const reset = useCallback(() => {
        setDisplayText(children);
    }, [children]);

    return (
        <span
            className={`${styles.textScramble} ${className}`}
            onMouseEnter={scramble}
            onMouseLeave={reset}
        >
            {displayText}
        </span>
    );
}
