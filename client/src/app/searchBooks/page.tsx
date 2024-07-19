import { SearchBooksPage } from '@/pages/searchBooks';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search Books - Bearscribes',
    description: `Use Bearscribes' search feature to find books available for exchange. Search by title, author, or genre to discover new books and connect with other members. Start searching today!`,
    keywords: `search books, Bearscribes search, find books, book exchange search, book lookup`,
};

const Page = () => {
    return <SearchBooksPage />;
};

export default Page;
