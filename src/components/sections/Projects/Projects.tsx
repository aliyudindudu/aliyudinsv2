"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { supabase, type Project } from "@/lib/supabase";
import styles from "./Projects.module.css";

export function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching projects:", error);
            } else {
                setProjects(data || []);
            }
            setLoading(false);
        }

        fetchProjects();
    }, []);

    useGSAP(
        () => {
            if (loading || projects.length === 0) return;

            const cards = document.querySelectorAll(`.${styles.projectCard}`);

            gsap.set(cards, { opacity: 1, x: 0 });

            cards.forEach((card, index) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        },
        { scope: sectionRef, dependencies: [projects, loading] }
    );

    return (
        <section ref={sectionRef} id="projects" className={styles.projects}>
            <div className={styles.container}>
                <span className={styles.sectionLabel}>Projects</span>
                <h2 className={styles.heading}>Featured Work</h2>

                {loading ? (
                    <div className={styles.loading}>Loading projects...</div>
                ) : projects.length === 0 ? (
                    <div className={styles.empty}>
                        No projects yet. Add some from the admin dashboard!
                    </div>
                ) : (
                    <div className={styles.projectList}>
                        {projects.map((project, index) => (
                            <article
                                key={project.id}
                                className={`${styles.projectCard} ${index % 2 !== 0 ? styles.projectCardReverse : ""
                                    }`}
                            >
                                <div className={styles.imageWrapper}>
                                    {project.image_url ? (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className={styles.image}
                                        />
                                    ) : (
                                        <div className={styles.imagePlaceholder}>🖼️</div>
                                    )}
                                </div>

                                <div className={styles.content}>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>
                                        {project.description}
                                    </p>

                                    <div className={styles.techStack}>
                                        {project.tech_stack.map((tech) => (
                                            <span key={tech} className={styles.techBadge}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={styles.links}>
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                🔗 Live Demo
                                            </a>
                                        )}
                                        {project.repo_url && (
                                            <a
                                                href={project.repo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                📁 GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
