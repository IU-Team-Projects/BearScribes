'use client';
import './SearchItem.css';
import OpenLibraryBook from '@/models/openLibraryBook';
import Image from 'next/image';

const SearchItem = ({ book }: { book: OpenLibraryBook }) => {
    const coverURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
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
