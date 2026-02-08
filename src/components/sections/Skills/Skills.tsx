"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import styles from "./Skills.module.css";

const skills = [
    { name: "React", icon: "⚛️", years: 1, level: 60 },
    { name: "Next.js", icon: "▲", years: 1, level: 60 },
    { name: "TypeScript", icon: "TS", years: 1, level: 60 },
    { name: "GSAP", icon: "🎬", years: 1, level: 60 },
    { name: "Node.js", icon: "⬡", years: 1, level: 60 },
    { name: "Tailwind", icon: "🎨", years: 1, level: 60 },
    { name: "Git", icon: "📦", years: 2, level: 70 },
    { name: "Figma", icon: "🔧", years: 1, level: 60 },
];

export function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!cardsRef.current) return;

            const cards = cardsRef.current.querySelectorAll(`.${styles.card}`);
            const progressBars = cardsRef.current.querySelectorAll(
                `.${styles.progressFill}`
            );

            // Set initial state to visible
            gsap.set(cards, { opacity: 1, y: 0 });

            // Cards stagger in
            gsap.fromTo(cards,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Animate progress bars
            progressBars.forEach((bar, index) => {
                gsap.to(bar, {
                    width: `${skills[index].level}%`,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="skills" className={styles.skills}>
            <div className={styles.container}>
                <span className={styles.sectionLabel}>Skills</span>
                <h2 className={styles.heading}>Technologies I Work With</h2>

                <div ref={cardsRef} className={styles.grid}>
                    {skills.map((skill) => (
                        <div key={skill.name} className={styles.card}>
                            <div className={styles.icon}>{skill.icon}</div>
                            <h3 className={styles.name}>{skill.name}</h3>
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} />
                            </div>
                            <span className={styles.years}>{skill.years}+ years</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
