import Header from '@/shared/ui/header';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Login - Bearscribes',
    description: `Log in to your Bearscribes account to manage your book exchange profile, browse other users' collections, and offer exchanges. Not a member yet? Sign up to start swapping books today!`,
    keywords: `login, Bearscribes, book exchange login, user login, access account`,
};

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
