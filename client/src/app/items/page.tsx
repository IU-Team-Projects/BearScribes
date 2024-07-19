import { ItemsPage } from '@/pages/items';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Books - Bearscribes',
    description: `View detailed information about individual books available for exchange on Bearscribes. Find books you’re interested in, check their availability, and offer an exchange to other users.`,
    keywords: `books, Bearscribes, book details, book exchange items, view books`,
};

const Page = () => {
    return <ItemsPage />;
};

export default Page;
