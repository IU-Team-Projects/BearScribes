import Header from '@/shared/ui/header';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Bearscribes',
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
            <div style={{ position: 'absolute', left: '80vw', top: '1vw' }}>
                {' '}
                <Header />{' '}
            </div>
            {children}
        </>
    );
}
