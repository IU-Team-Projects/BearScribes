'use client';
import './SearchItem.css';
import OpenLibraryBook from '@/models/openLibraryBook';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import UserBook from '@/models/userBook';


const SearchItem = ({ book }: { book: OpenLibraryBook }) => {
    const coverURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

    const [books, setBooks] = useState<UserBook[]>([]);
  
    const [message, setMessage] = useState('');

    const backendURL =  process.env.NEXT_PUBLIC_BACKEND_URL || '';
    const backendBooksURL = backendURL + "/books"


    const fetchBooks = async () => {
        try {
            const response = await fetch(backendURL + '/books/', {
                credentials: 'include',
                headers: {
                    accept: 'application/json',
                },
            });
            console.log(response)
            if (!response.ok) {
                console.error(
                    'Failed to fetch books:',
                    response.statusText,
                );
                return;
            }
            const data = await response.json();
            console.log('Books data:', data); 

            if (Array.isArray(data)) {
                const transformedBooks = data.map((book: UserBook) => ({
                    open_library_book: book.open_library_book,
                    id: book.id,
                    title: book.title,
                    authors: book.authors,
                    cover_url: book.cover_url
                }));
                setBooks(transformedBooks);
            } else {
                console.error('Books data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks()
    })
        
    const checkIfBookExist = (openLibraryId: string): boolean => {
        return books.some(fetchedBook => fetchedBook.open_library_book == openLibraryId)
    }
    
    const addBook = async () => {
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

        if (checkIfBookExist(book.cover_edition_key)) {
            setMessage("Book is already added!!!")
            return 
        } else {
            setMessage("Added book to library")
        }

        fetch(backendBooksURL, { ...options, credentials: 'include' })
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
                    <p style={{ fontSize: '20px', fontWeight: 'bold' , color: "red"}}>
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
