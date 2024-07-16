import React, { useEffect, useState } from 'react';
import Header from '@/shared/ui/Header/Header';
import Footer from '@/shared/ui/Footer/Footer';
import UserInfo from '@/shared/ui/UserInfo/UserInfo';
import BookGrid from '@/shared/ui/BookGrid/BookGrid';
import styles from './LibraryPage.module.scss';
import UserInfoModel from '@/models/userInfo';
import Book from '@/models/book';

export function LibraryPage() {
    const [userInfo, setUserInfo] = useState<UserInfoModel | null>(null);
    const [books, setBooks] = useState<Book[]>([]);
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(backendURL + '/auth/user_info', {
                    credentials: 'include',
                    headers: {
                        accept: 'application/json',
                    },
                });
                if (!response.ok) {
                    console.error(
                        `Failed to fetch user info with next token ${token}:`,
                        response.statusText,
                    );
                    return;
                }
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await fetch(backendURL + '/books/', {
                    headers: {
                        accept: 'application/json',
                    },
                });
                if (!response.ok) {
                    console.error(
                        'Failed to fetch books:',
                        response.statusText,
                    );
                    return;
                }
                const data = await response.json();
                console.log('Books data:', data); // Log the data to inspect it

                if (Array.isArray(data)) {
                    const transformedBooks = data.map((book: any) => ({
                        id: book.id.toString(),
                        selfLink: `https://openlibrary.org/books/${book.open_library_book}`,
                        volumeInfo: {
                            title: book.title,
                            authors: book.authors.split(','),
                            publisher: '',
                            publishedDate: '',
                            description: '',
                            pageCount: 0,
                            categories: [],
                            averageRating: 0,
                            coverId: book.cover_url,
                        },
                    }));
                    setBooks(transformedBooks);
                } else {
                    console.error('Books data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchUserInfo();
        fetchBooks();
    }, [backendURL]);

    return (
        <div className={styles.libraryPage}>
            <Header />
            {userInfo && <UserInfo {...userInfo} />}
            <BookGrid books={books} />
            <Footer />
        </div>
    );
}

export default LibraryPage;
