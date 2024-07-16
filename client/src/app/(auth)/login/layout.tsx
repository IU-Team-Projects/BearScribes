import Header from '@/shared/ui/header';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Bear Scribes Log Ip',
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
