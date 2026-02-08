"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/ui/MagneticButton";
import styles from "./Contact.module.css";

const socials = [
    { name: "GitHub", icon: "📁", url: "https://github.com/aliyudindudu" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/aliyudin-saptari-685a70390" },
    { name: "Twitter", icon: "📷", url: "https://www.instagram.com/4alyudd_/" },
];

export function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!contentRef.current) return;

            const elements = contentRef.current.children;

            // Set initial state to visible
            gsap.set(elements, { opacity: 1, y: 0 });

            gsap.fromTo(elements,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} id="contact" className={styles.contact}>
            <div ref={contentRef} className={styles.container}>
                <span className={styles.sectionLabel}>Contact</span>

                <h2 className={styles.heading}>Let's Work Together</h2>

                <p className={styles.subheading}>
                    Have a project in mind? Let's create something amazing together.
                    I'm always open to discussing new opportunities.
                </p>

                <MagneticButton href="mailto:aliyudinsaptari07@gmail.com" className={styles.emailButton} strength={0.4}>
                    📧 hello@aliyudin.dev
                </MagneticButton>

                <div className={styles.socials}>
                    {socials.map((social) => (
                        <MagneticButton
                            key={social.name}
                            href={social.url}
                            className={styles.socialLink}
                            strength={0.5}
                        >
                            {social.icon}
                        </MagneticButton>
                    ))}
                </div>
            </div>
        </section>
    );
}

