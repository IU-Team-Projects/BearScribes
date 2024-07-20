import Footer from '@/shared/ui/Footer/Footer';
import Header from '@/shared/ui/Header/Header';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'Book info',
    description: `Learn more about Bearscribes, the premier book exchange platform where you can list books you want to exchange, discover other users' collections, and find your next great read. Join our community today!`,
    keywords: `book exchange, Bearscribes, about us, book swapping, book exchange platform`,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
