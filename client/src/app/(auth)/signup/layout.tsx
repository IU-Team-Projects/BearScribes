import Header from '@/shared/ui/header';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Bear Scribes Sign Up',
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
