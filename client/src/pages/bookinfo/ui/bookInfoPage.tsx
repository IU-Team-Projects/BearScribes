'use client';

import Book from '../../../models/book';
import './BookInfo.css';
import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// https://www.googleapis.com/books/v1/volumes?q=snowman

export function BookInfoPage({ book }: { book: Book }) {
  const volumeInfo = book.volumeInfo;
  const [cover, setCover] = useState('');

  useEffect(() => {
    async function fetchCover() {
      const coverUrl =
        'https://covers.openlibrary.org/b/id/' + volumeInfo.coverId + '-L.jpg';
      setCover(coverUrl);
    }

    fetchCover();
  }, [volumeInfo.coverId]);

  return (
    <div className="book-info-container">
      <div className="book-cover-and-info">
        <Image
          className="book-info-poster"
          src={cover}
          alt="book"
          width={500}
          height={500}
        />
        <div className="line-separator"></div>
        <div className="book-info">
          <div className="book-info-title-and-rating">
            <h2 className="book-info-title">{volumeInfo.title}</h2>
            <div className="book-info-rating-star">
              <p>{volumeInfo.averageRating}</p>
              <FontAwesomeIcon icon={faStar} className="book-info-star" />
            </div>
          </div>
          <p className="book-info-description"> {volumeInfo.description}</p>

          <div className="book-info-authors-pages-categories">
            <div className="book-info-authors">
              {' '}
              Authors:{' '}
              {volumeInfo.authors.map((author, index) => (
                <p key={index}>{author}</p>
              ))}
            </div>

            {/* <p className="book-info-page"> Pages: {volumeInfo.pageCount}</p> */}

            <div className="book-info-categories">
              {' '}
              Categories:{' '}
              {volumeInfo.categories.map((category, index) => (
                <p key={index}>{category}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
