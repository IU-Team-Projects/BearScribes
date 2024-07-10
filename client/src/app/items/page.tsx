"use client";
import "./Items.css"
import Item from "./Item"
import UserBook from "@/models/userBook";

let books: UserBook[] = [
    {
        name: "Dead Souls",
        username: "Timur",
        description: "This is a great bookaj;sdlfkja;lsdkj;falkjsd;lfkja;lsk",
        telegram: "@timur123",
        cover: "https://img3.labirint.ru/rc/b6146b243819a780583cfa781c883928/363x561q80/books91/901899/cover.jpg?1668180317",
    },
    {
        name: "Alice in wonderland",
        username: "Artur",
        description: "This is an amazing book",
        telegram: "@Artur123",
        cover: "https://ik.imagekit.io/panmac/tr:f-auto,di-placeholder_portrait_aMjPtD9YZ.jpg,w-270/edition/9781447279990.jpg"
    },
    {
        name: "It",
        username: "Vlad",
        description: "This is an amazing book",
        telegram: "@Vlad123",
        cover: "https://m.media-amazon.com/images/I/61pjyMrRCSL._AC_UF1000,1000_QL80_.jpg"
    },
]

function Items() {
    return (
        <div className="items-container">
            <header className="items-header">
                <h2>Bear Scribes</h2>
                <button> Library</button>
            </header>

            <div className="search-container">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>


            <div className="book-item">
                {books.map((book, index) => (
                    <Item key={index} book={book} />
                ) )}
            </div>


            <footer className="items-footer">
                <div className="title-email-license">
                    <h2>Bear Scribes</h2>
                    <p>Updates right to your inbox</p>

                    <input type="text" />
                    <button> Send </button>
                </div>

                <div className="our-story">

                </div>

                <div className="share-point">

                </div>

            </footer>
        </div>
    )
}

export default Items