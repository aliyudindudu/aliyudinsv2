"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Hero.module.css";

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const roleRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current || !nameRef.current) return;

            const letters = nameRef.current.querySelectorAll(`.${styles.letter}`);

            // Create pinned scroll timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    pin: true,
                    scrub: 1,
                },
            });

            // Initial state
            gsap.set(nameRef.current, { opacity: 1 });
            gsap.set(letters, { opacity: 0, y: 100 });
            gsap.set(roleRef.current, { opacity: 0, y: 30 });
            gsap.set(scrollIndicatorRef.current, { opacity: 0 });

            // Animation sequence
            tl
                // Letters reveal (0% - 50%)
                .to(letters, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power3.out",
                })
                // Fill in the text (50% - 70%)
                .to(
                    nameRef.current,
                    {
                        className: `${styles.name} ${styles.nameVisible} ${styles.nameFilled}`,
                        duration: 0.2,
                    },
                    "+=0.1"
                )
                // Role appears (70% - 85%)
                .to(
                    roleRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "-=0.1"
                )
                // Scroll indicator appears (85% - 100%)
                .to(
                    scrollIndicatorRef.current,
                    {
                        opacity: 1,
                        duration: 0.2,
                    },
                    "+=0.1"
                );
        },
        { scope: containerRef }
    );

    const name = "ALIYUDIN";

    return (
        <section ref={containerRef} className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 ref={nameRef} className={styles.name}>
                    {name.split("").map((letter, index) => (
                        <span key={index} className={styles.letter}>
                            {letter}
                        </span>
                    ))}
                </h1>

                <p ref={roleRef} className={styles.role}>
                    Junior Frontend Developer
                </p>
            </div>

            <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
                <span className={styles.scrollText}>Scroll</span>
                <div className={styles.scrollArrow} />
            </div>
        </section>
    );
}
