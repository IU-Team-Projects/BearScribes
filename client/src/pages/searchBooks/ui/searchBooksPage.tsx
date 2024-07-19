'use client';

import '@/pages/items/ui/Items.css';
import '@/shared/ui/SearchBar/SearchBar.css';
import SearchItem from '../../../shared/ui/SearchItem/SearchItem';

import SearchBooksHeader from '../../../shared/ui/SearchBooksHeader/SearchBooksHeader';
import SearchBooksFooter from '../../../shared/ui/SearchBooksFooter/SearchBooksFooter';

import OpenLibraryBook from '@/models/openLibraryBook';
import OpenLibraryResults from '@/models/openLibraryResults';
import { useEffect, useState } from 'react';
import { OrbitProgress } from 'react-loading-indicators';

const defaultBooks: OpenLibraryBook[] = [];

const defaultBookCover: string = 'https://static.vecteezy.com/system/resources/thumbnails/019/900/152/small_2x/old-book-watercolor-illustration-png.png';

export function SearchBooksPage() {
    let [books, setBooks] = useState<OpenLibraryBook[]>(defaultBooks);
    let [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        setLoading(true);
        const searchQuery = query.replace(/\s+/g, '+').toLowerCase();
        const searchURL = `https://openlibrary.org/search.json?q=${searchQuery}`;

        try {
            const response = await fetch(searchURL, { cache: 'reload' });
            const openLibraryResults: OpenLibraryResults =
                await response.json();
            const books: OpenLibraryBook[] = openLibraryResults.docs.map(
                (doc) => ({
                    author_name: doc.author_name || [],
                    cover_edition_key: doc.cover_edition_key || '',
                    cover_i: doc.cover_i || 0,
                    first_publish_year: doc.first_publish_year || 0,
                    first_sentence: doc.first_sentence || [],
                    title: doc.title || '',
                    cover_url: doc.cover_i
                        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
                        : defaultBookCover,
                }),
            );

            setBooks(books);
            setQuery("")
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        const hasSearched = localStorage.getItem('hasSearched');
        if (!hasSearched) {
            setQuery('Harry Potter');
            handleSearch();
            localStorage.setItem('hasSearched', 'true');
        }
    }, []);

    return (
        <div className="items-container">
            <SearchBooksHeader />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <OrbitProgress
                        variant="dotted"
                        color="#3366FF"
                        size="medium"
                        text=""
                        textColor=""
                    />
                </div>
            ) : (
                <div className="book-item">
                    {books.map((book, index) => (
                        <SearchItem key={index} book={book} />
                    ))}
                </div>
            )}

            <SearchBooksFooter />
        </div>
    );
}
