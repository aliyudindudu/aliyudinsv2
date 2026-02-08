import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aliyudin | Senior Frontend Developer",
  description: "Portfolio website showcasing creative frontend development with stunning animations and Neo-Brutalist design.",
  keywords: ["Frontend Developer", "React", "Next.js", "GSAP", "Portfolio", "Web Developer"],
  authors: [{ name: "Aliyudin" }],
  openGraph: {
    title: "Aliyudin | Senior Frontend Developer",
    description: "Portfolio website showcasing creative frontend development with stunning animations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
