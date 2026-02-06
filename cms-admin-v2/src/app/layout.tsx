/**
 * Root layout for CMS Admin application.
 * Provides global styles and metadata.
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AiGENThix CMS',
    description: 'Content Management System for AiGENThix Blog',
    robots: 'noindex, nofollow', // CMS should not be indexed
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} antialiased bg-[#0a0a0a] text-white min-h-screen`}>
                {children}
            </body>
        </html>
    );
}
