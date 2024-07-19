'use client';
import './SearchItem.css';
import OpenLibraryBook from '@/models/openLibraryBook';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserBook from '@/models/userBook';

const SearchItem = ({ book }: { book: OpenLibraryBook }) => {
    const coverURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

    const [favorites, setFavorites] = useState<UserBook[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem('favorites') ?? '') || [];
        setFavorites(storedFavorites);
    }, []);

    const addBook = () => {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

        const payload = {
            open_library_book: book.cover_edition_key,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };

        fetch(backendURL + '/books', { ...options, credentials: 'include' })
            .then((response) => {
                if (response.status === 404) {
                    console.error('Error: Resource not found (404)');
                } else if (response.status === 422) {
                    console.error('Error: Validation err (422)');
                } else if (!response.ok) {
                    throw new Error(
                        'Network response was not ok ' + response.statusText,
                    );
                }
                return response.json();
            })
            .then((data: UserBook) => {
                console.log('Success:', data);

                if (favorites.some((favBook) => favBook.id === data.id)) {
                    setMessage('You already added this book to favorites.');
                } else {
                    const newFavorites = [...favorites, data];
                    setFavorites(newFavorites);
                    setMessage('Book added to favorites.');
                }
            })
            .catch((error) => {
                console.error(
                    'There was a problem with the fetch operation:',
                    error,
                );
            });
    };

    return (
        <div className="item-container">
            <div className="item-text-fields">
                <h2> {book.title}</h2>
                <div>
                    Authors:
                    {book.author_name.map((author, index) => (
                        <p key={index}>{author}</p>
                    ))}
                </div>
                <div className="user-info">
                    <p>First sentence: {book.first_sentence}</p>
                </div>
                {message ? (
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        {message}
                    </p>
                ) : (
                    <button onClick={addBook}>Add</button>
                )}
            </div>

            <Image
                src={book.cover_url}
                alt="book-cover"
                className="book-cover"
                width={500}
                height={500}
            />
        </div>
    );
};

export default SearchItem;
