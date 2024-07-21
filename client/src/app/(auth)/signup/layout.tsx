import Header from '@/shared/ui/header';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sign Up - Bearscribes',
    description:
        'Create your Bearscribes account to start exchanging books with other members. Sign up now to list your books, explore other profiles, and find great books to swap!',
    keywords:
        'signup, Bearscribes, book exchange sign up, create account, join community',
};

export default function SignupLayout({
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
