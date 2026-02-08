"use client";

import { useRef, useState, useCallback } from "react";
import styles from "./MagneticButton.module.css";

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    strength?: number;
}

export function MagneticButton({
    children,
    href,
    onClick,
    className = "",
    strength = 0.3,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            setPosition({ x: deltaX, y: deltaY });
        },
        [strength]
    );

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
    };

    const props = {
        ref: buttonRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
        className: `${styles.magneticButton} ${className}`,
        style,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    };

    if (href) {
        return (
            <a {...props} href={href}>
                {children}
            </a>
        );
    }

    return (
        <button {...props} onClick={onClick}>
            {children}
        </button>
    );
}
