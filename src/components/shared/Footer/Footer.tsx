"use client";

import styles from "./Footer.module.css";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h3>ALIYUDIN</h3>
                        <p>Junior Frontend Developer</p>
                        <p className={styles.tagline}>Made with 💚 and lots of ☕</p>
                    </div>

                    <div className={styles.column}>
                        <h4>Navigation</h4>
                        <ul>
                            <li><a href="#about">About</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="https://github.com/aliyudindudu" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/aliyudin-saptari-685a70390/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://www.instagram.com/4alyudd_/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="mailto:aliyudinsaptari07@gmail.com">Email</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © 2026 Aliyudin. All rights reserved.
                    </p>
                    <button onClick={scrollToTop} className={styles.backToTop}>
                        Back to Top ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}
