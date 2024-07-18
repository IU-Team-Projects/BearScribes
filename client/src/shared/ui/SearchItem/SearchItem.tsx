'use client';
import './SearchItem.css';
import OpenLibraryBook from '@/models/openLibraryBook';
import Image from 'next/image';

const SearchItem = ({ book }: { book: OpenLibraryBook }) => {
    const coverURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

    const addBook = () => {
        const url = "http://134.0.118.132:8001/books"
        const payload = {
            open_library_book: book.cover_edition_key
        }

        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetch(url, options)
            .then(response => {
                if (response.status === 404) {
                    console.error('Error: Resource not found (404)');
                  } else if (response.status === 422) {
                    console.error('Error: Validation error (422)');
                  } else if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                  }
                return response.json();
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

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

                <button onClick={addBook}>Add</button>
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
