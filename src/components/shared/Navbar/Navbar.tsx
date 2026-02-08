"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled past threshold
            setIsScrolled(window.scrollY > 100);

            // Calculate scroll progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(progress);

            // Detect active section
            const sections = ["about", "skills", "projects", "contact"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <div
                className={styles.scrollProgress}
                style={{ width: `${scrollProgress}%` }}
            />

            <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
                <div className={styles.container}>
                    <a href="#" className={styles.logo}>
                        ALI<span className={styles.logoAccent}>.</span>
                    </a>

                    <button
                        className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ""}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className={`${styles.navLink} ${activeSection === item.href.slice(1) ? styles.navLinkActive : ""
                                        }`}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
}
