'use client';
import './Item.css';
import UserBook from '../../../models/userBook';
import Image from 'next/image';

const Item = ({ book }: { book: UserBook }) => {
    const contactUser = () => {
        const telegramURL = `https://t.me/${book.telegram}`;
        window.open(telegramURL, '_blank');
    };
    return (
        <div className="item-container">
            <div className="item-text-fields">
                <h2> {book.name}</h2>
                <div className="user-info">
                    <p>User: {book.username}</p>
                    <p>Description: {book.description}</p>
                    <p>Telegram: {book.telegram}</p>
                </div>
                <button onClick={contactUser}>Contact User</button>
            </div>

            <Image
                src={book.cover}
                alt="book-cover"
                className="book-cover"
                width={500}
                height={500}
            />
        </div>
    );
};

export default Item;
