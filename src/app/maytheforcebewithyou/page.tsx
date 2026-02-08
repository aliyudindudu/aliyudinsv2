"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, type Project, type Database } from "@/lib/supabase";
import styles from "./admin.module.css";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech_stack: "",
        image_url: "",
        demo_url: "",
        repo_url: "",
    });

    // Check auth on mount
    useEffect(() => {
        const auth = sessionStorage.getItem("admin_auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // Fetch projects when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects();
        }
    }, [isAuthenticated]);

    async function fetchProjects() {
        const { data, error } = await (supabase.from("projects") as any)
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setProjects(data);
        }
    }

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        if (password === "aliyudin2024") {
            sessionStorage.setItem("admin_auth", "true");
            setIsAuthenticated(true);
        } else {
            alert("Wrong password!");
        }
    }

    function handleLogout() {
        sessionStorage.removeItem("admin_auth");
        setIsAuthenticated(false);
    }

    function resetForm() {
        setFormData({
            title: "",
            description: "",
            tech_stack: "",
            image_url: "",
            demo_url: "",
            repo_url: "",
        });
        setEditingProject(null);
        setShowForm(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleEdit(project: Project) {
        setFormData({
            title: project.title,
            description: project.description,
            tech_stack: project.tech_stack.join(", "),
            image_url: project.image_url || "",
            demo_url: project.demo_url || "",
            repo_url: project.repo_url || "",
        });
        setEditingProject(project);
        setShowForm(true);
    }

    // Upload image to Supabase Storage
    async function uploadImage(file: File): Promise<string | null> {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        setUploading(true);

        const { error } = await supabase.storage
            .from("project-images")
            .upload(fileName, file);

        setUploading(false);

        if (error) {
            alert("Error uploading image: " + error.message);
            return null;
        }

        // Get public URL
        const { data } = supabase.storage
            .from("project-images")
            .getPublicUrl(fileName);

        return data.publicUrl;
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be less than 5MB");
            return;
        }

        const imageUrl = await uploadImage(file);
        if (imageUrl) {
            setFormData({ ...formData, image_url: imageUrl });
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const projectData: Database["public"]["Tables"]["projects"]["Insert"] = {
            title: formData.title,
            description: formData.description,
            tech_stack: formData.tech_stack.split(",").map((t) => t.trim()).filter((t) => t.length > 0),
            image_url: formData.image_url || null,
            demo_url: formData.demo_url || null,
            repo_url: formData.repo_url || null,
        };

        if (editingProject) {
            const { error } = await (supabase.from("projects") as any)
                .update(projectData)
                .eq("id", editingProject.id);

            if (error) {
                alert("Error updating: " + error.message);
            } else {
                fetchProjects();
                resetForm();
            }
        } else {
            const { error } = await (supabase.from("projects") as any).insert(projectData);

            if (error) {
                alert("Error adding: " + error.message);
            } else {
                fetchProjects();
                resetForm();
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const { error } = await (supabase.from("projects") as any).delete().eq("id", id);

        if (error) {
            alert("Error deleting: " + error.message);
        } else {
            fetchProjects();
        }
    }

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.loginContainer}>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    <h1>🔐 Admin Login</h1>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.buttonPrimary}>
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>📊 Admin Dashboard</h1>
                <div className={styles.headerActions}>
                    <a href="/" className={styles.buttonSecondary}>
                        ← Back to Site
                    </a>
                    <button onClick={handleLogout} className={styles.buttonDanger}>
                        Logout
                    </button>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2>Projects ({projects.length})</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className={styles.buttonPrimary}
                        >
                            + Add Project
                        </button>
                    </div>

                    {showForm && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h3>{editingProject ? "Edit Project" : "Add New Project"}</h3>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <input
                                        type="text"
                                        placeholder="Title *"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        required
                                        className={styles.input}
                                    />
                                    <textarea
                                        placeholder="Description *"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        required
                                        className={styles.textarea}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Tech Stack (comma separated) *"
                                        value={formData.tech_stack}
                                        onChange={(e) =>
                                            setFormData({ ...formData, tech_stack: e.target.value })
                                        }
                                        required
                                        className={styles.input}
                                    />

                                    {/* Image Upload Section */}
                                    <div className={styles.imageUpload}>
                                        <label className={styles.uploadLabel}>
                                            📷 Project Image
                                        </label>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className={styles.fileInput}
                                            disabled={uploading}
                                        />
                                        {uploading && (
                                            <span className={styles.uploadingText}>
                                                Uploading...
                                            </span>
                                        )}
                                        {formData.image_url && (
                                            <div className={styles.imagePreview}>
                                                <img
                                                    src={formData.image_url}
                                                    alt="Preview"
                                                    className={styles.previewImg}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setFormData({ ...formData, image_url: "" })
                                                    }
                                                    className={styles.removeImage}
                                                >
                                                    ✕ Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="url"
                                        placeholder="Live Demo URL"
                                        value={formData.demo_url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, demo_url: e.target.value })
                                        }
                                        className={styles.input}
                                    />
                                    <input
                                        type="url"
                                        placeholder="GitHub Repo URL"
                                        value={formData.repo_url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, repo_url: e.target.value })
                                        }
                                        className={styles.input}
                                    />
                                    <div className={styles.formActions}>
                                        <button
                                            type="submit"
                                            className={styles.buttonPrimary}
                                            disabled={uploading}
                                        >
                                            {editingProject ? "Update" : "Add"} Project
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className={styles.buttonSecondary}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className={styles.projectList}>
                        {projects.length === 0 ? (
                            <p className={styles.empty}>No projects yet. Add your first one!</p>
                        ) : (
                            projects.map((project) => (
                                <div key={project.id} className={styles.projectCard}>
                                    {project.image_url && (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className={styles.projectThumb}
                                        />
                                    )}
                                    <div className={styles.projectInfo}>
                                        <h4>{project.title}</h4>
                                        <p>{project.description.substring(0, 100)}...</p>
                                        <div className={styles.techStack}>
                                            {project.tech_stack.map((tech) => (
                                                <span key={tech} className={styles.badge}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.projectActions}>
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className={styles.buttonSecondary}
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className={styles.buttonDanger}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
