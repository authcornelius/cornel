import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cornelius Oaikhienan Johnson - Senior Full Stack Developer",
  description:
    "Professional portfolio of Cornelius Oaikhienan Johnson, Senior Full Stack Developer with 8+ years of experience in React, Node.js, and cloud technologies.",
  keywords:
    "Full Stack Developer, React, Node.js, JavaScript, TypeScript, AWS, Software Engineer",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
