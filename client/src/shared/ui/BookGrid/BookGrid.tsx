import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './BookGrid.module.scss';
import Book from '@/models/book';

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
            {books.length === 0 ? (
                <div className={styles.noBooks}>
                    <p>No books found in your library. Start adding some!</p>
                </div>
            ) : (
                books.map((book) => (
                    <div
                        key={book.id}
                        className={styles.bookCard}
                        onClick={() => handleBookClick(book.id)}
                    >
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.authors.join(', ')}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default BookGrid;
