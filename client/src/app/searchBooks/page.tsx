"use client";
import "../../styles/Items.css"
import "../../styles/SearchBar.css"
import SearchItem from "../../components/SearchItem"
import Footer from "../../components/Footer";
import Header from "../../components/Header"
import OpenLibraryBook from "@/models/openLibraryBook";
import OpenLibraryResults from "@/models/openLibraryResults";
import { useEffect, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";


const defaultBooks: OpenLibraryBook[] = [
    {
        author_name: ["Author One"],
        cover_i: 123456,
        first_publish_year: 2000,
        first_sentence: ["First sentence of the book."],
        title: "Book One",
        cover_url: "http://example.com/cover1.jpg"
    },
    {
        author_name: ["Author Two"],
        cover_i: 789101,
        first_publish_year: 2010,
        first_sentence: ["Another first sentence."],
        title: "Book Two",
        cover_url: "http://example.com/cover2.jpg"
    }
];


function SearchBooks() {
    let [books, setBooks] = useState<OpenLibraryBook[]>(defaultBooks)
    let [query, setQuery] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const savedBooks = localStorage.getItem('books');
        if (savedBooks) {
            setBooks(JSON.parse(savedBooks));
        } else {
            setBooks(defaultBooks);
        }
    }, []);

    useEffect(() => {
        if (books.length > 0) {
            localStorage.setItem('books', JSON.stringify(books));
        }
    }, [books]);

    const handleSearch = async () => {
        setLoading(true);
        const searchQuery = query.replace(/\s+/g, "+").toLowerCase();
        const searchURL = `https://openlibrary.org/search.json?q=${searchQuery}`;

        try {
            const response = await fetch(searchURL, { cache: "reload" });
            const openLibraryResults: OpenLibraryResults = await response.json();
            const books: OpenLibraryBook[] = openLibraryResults.docs.map(doc => ({
                author_name: doc.author_name || [],
                cover_i: doc.cover_i || 0,
                first_publish_year: doc.first_publish_year || 0,
                first_sentence: doc.first_sentence || [],
                title: doc.title || "",
                cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : "https://static.vecteezy.com/system/resources/thumbnails/019/900/152/small_2x/old-book-watercolor-illustration-png.png"
            }));

            setBooks(books);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="items-container">
            <Header />
            <div className="search-container">
                <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyPress}/>
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
                    <OrbitProgress variant="dotted" color="#3366FF" size="medium" text="" textColor="" />
                </div>
            ) : (
                <div className="book-item">
                    {books.map((book, index) => (
                        <SearchItem key={index} book={book} />
                    ))}
                </div>
            )}

            <Footer />
        </div>
    )
}

export default SearchBooks