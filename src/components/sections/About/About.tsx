"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import styles from "./About.module.css";

export function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!contentRef.current) return;

            const elements = contentRef.current.querySelectorAll(
                `.${styles.textContent} > *, .${styles.decorative} > *`
            );

            // Set initial state explicitly
            gsap.set(elements, { opacity: 1, y: 0 });

            gsap.fromTo(
                elements,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="about" className={styles.about}>
            <div className={styles.container}>
                <span className={styles.sectionLabel}>About Me</span>

                <div ref={contentRef} className={styles.content}>
                    <div className={styles.textContent}>
                        <h2 className={styles.heading}>
                            Hi, I'm <span className={styles.headingAccent}>Aliyudin</span> 🐸
                        </h2>

                        <p className={styles.bio}>
                            A Junior Frontend Developer crafting
                            beautiful, performant web experiences. I specialize in React,
                            Next.js, and animation-rich interfaces that delight users.
                        </p>

                        <p className={styles.bio}>
                            I believe great websites should feel alive — every scroll, every
                            hover, every interaction should spark joy. That's why I focus on
                            micro-interactions and smooth animations.
                        </p>

                        <div className={styles.cta}>
                            <a
                                href="/resume.pdf"
                                className={`${styles.button} ${styles.buttonPrimary}`}
                            >
                                📄 Resume
                            </a>
                            <a
                                href="#contact"
                                className={`${styles.button} ${styles.buttonSecondary}`}
                            >
                                💬 Contact Me
                            </a>
                        </div>
                    </div>

                    <div className={styles.decorative}>
                        <div className={styles.funFact}>
                            <span className={styles.funFactLabel}>Fun Fact</span>
                            <p className={styles.funFactText}>
                                "Powered by coffee ☕ and clean code"
                            </p>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>-1</span>
                                <span className={styles.statLabel}>Years</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>1+</span>
                                <span className={styles.statLabel}>Projects</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>1+</span>
                                <span className={styles.statLabel}>Clients</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>∞</span>
                                <span className={styles.statLabel}>Coffee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
