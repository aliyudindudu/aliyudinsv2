import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Admin Dashboard | Aliyudin",
    robots: "noindex, nofollow",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="admin-layout">{children}</div>;
}
