import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Bearscribes - Your Book Exchange Community',
    description: `Welcome to Bearscribes, the ultimate book exchange community where you can add books to your profile, browse other members' collections, and offer exchanges. Join today to connect with fellow book lovers and expand your library!`,
    keywords:
        'book exchange, Bearscribes, book sharing, book swapping, book lovers community, book profiles, exchange books',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
