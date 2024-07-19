import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './BookGrid.module.scss';
import Book from '@/models/book';
import Image from 'next/image';

interface BookGridProps {
    books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
    const router = useRouter();

    const handleBookClick = (bookId: string) => {
        router.push(`/bookInfo/${bookId}`);
    };

    return (
        <div className={styles.bookGrid}>
            {books.map((book) => (
                <div
                    key={book.id}
                    className={styles.bookCard}
                    onClick={() => handleBookClick(book.id)}
                >
                    {/*<Image*/}
                    {/*    src={book.volumeInfo.coverId}*/}
                    {/*    alt={book.volumeInfo.title}*/}
                    {/*    width={500}*/}
                    {/*    height={500}*/}
                    {/*/>*/}
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default BookGrid;
