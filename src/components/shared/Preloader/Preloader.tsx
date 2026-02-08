"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import styles from "./Preloader.module.css";

interface PreloaderProps {
    onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useGSAP(
        () => {
            if (!progressRef.current || !percentRef.current) return;

            const tl = gsap.timeline({
                onComplete: () => {
                    setIsComplete(true);
                    onComplete?.();
                },
            });

            // Animate progress bar
            tl.to(progressRef.current, {
                width: "100%",
                duration: 2,
                ease: "power2.inOut",
                onUpdate: function () {
                    const progress = Math.round(this.progress() * 100);
                    if (percentRef.current) {
                        percentRef.current.textContent = `${progress}%`;
                    }
                },
            })
                // Hold for a moment
                .to({}, { duration: 0.3 })
                // Fade out preloader
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className={`${styles.preloader} ${isComplete ? styles.preloaderHidden : ""}`}
        >
            <div className={styles.loaderContainer}>
                <span className={styles.loaderText}>Loading</span>
                <div className={styles.loaderBar}>
                    <div ref={progressRef} className={styles.loaderProgress} />
                </div>
                <span ref={percentRef} className={styles.loaderPercent}>
                    0%
                </span>
            </div>
        </div>
    );
}
