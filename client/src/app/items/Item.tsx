"use client"
import "./Item.css"
import UserBook  from "../../models/userBook"
import Image from "next/image"

const Item = ({ book }: { book: UserBook }) => {
    return( 
        <div className="item-container">
            <div className="item-text-fields">
                <h2> {book.name}</h2>
                <div className="user-info">
                    <p>User: {book.username}</p>
                    <p>Description: {book.description}</p>
                    <p>Telegram: {book.telegram}</p>
                </div>
                <button>Contact User</button>
            </div>

            <img src={book.cover} alt="book-cover" className="book-cover" />
        </div>
    )
}


export default Item