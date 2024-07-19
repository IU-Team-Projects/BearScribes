import { LibraryPage } from '@/pages/library';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Library - Bearscribes',
    description: `Explore the Bearscribes library to find books available for exchange. Browse our collection, discover new reads, and connect with other members to offer and receive book swaps.`,
    keywords: `library, Bearscribes, book library, browse books, book exchange`,
};

const Page = () => {
    return <LibraryPage />;
};

export default Page;
