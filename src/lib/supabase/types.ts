export type Project = {
    id: string;
    created_at: string;
    title: string;
    description: string;
    tech_stack: string[];
    image_url: string | null;
    demo_url: string | null;
    repo_url: string | null;
};

export type Database = {
    public: {
        Tables: {
            projects: {
                Row: Project;
                Insert: Omit<Project, "id" | "created_at">;
                Update: Partial<Omit<Project, "id" | "created_at">>;
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
    };
};
