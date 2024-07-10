import Book from "../../models/book"
import "./BookInfo.css"

// https://www.googleapis.com/books/v1/volumes?q=snowman

function BookInfo({book}: {book: Book}) {
    return (
        <div>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt="book" />
            <div className="book-info">
                
            </div>
        </div>
    )
}

export default BookInfo