import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get('access_token');
      const response = await fetch(
        'https://editor-next.swagger.io/auth/user_info',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        },
      );
      const data = await response.json();
      setUserInfo(data);
    };

    const fetchBooks = async () => {
      const token = Cookies.get('access_token');
      const response = await fetch('https://editor-next.swagger.io/books/', {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
      });
      const data = await response.json();

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
    };

    fetchUserInfo();
    fetchBooks();
  }, []);

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
