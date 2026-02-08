"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        if (!cursor || !dot) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        };

        const animate = () => {
            // Smooth follow effect
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            requestAnimationFrame(animate);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add hover listeners to all clickable elements
        const clickables = document.querySelectorAll("a, button, [role='button']");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className={`${styles.cursor} ${isHovering ? styles.cursorHover : ""}`}
            />
            <div ref={dotRef} className={styles.cursorDot} />
        </>
    );
}
