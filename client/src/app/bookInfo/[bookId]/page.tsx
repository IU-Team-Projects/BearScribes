'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './BookInfoPages.module.css';
import handleImageLoad from './handleImageLoad';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { BookData } from '@/models/bookinfo';
import Image from 'next/image';

const BookInfoPage: React.FC = () =>  {
    const [data, setData] = useState<BookData | null>(null);
    const coverImageRef = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(true);
    const [bookDeleted, setBookDeleted] = useState(false);
    const infoBlockRef = useRef<HTMLDivElement>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const params = useParams();
    const bookId = params?.bookId as string;
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<BookData>(
                    backendURL + `/books/any_user/${bookId}`,
                    {
                        withCredentials: true,
                    },
                );
                const newData: BookData = { ...response.data };
                if (response.data.book.open_library_book) {
                    const openLibraryResponse = await axios.get(
                        `https://openlibrary.org/books/${response.data.book.open_library_book}.json`,
                    );
                    const {
                        publish_date,
                        number_of_pages,
                        publishers,
                        description,
                    } = openLibraryResponse.data;
                    newData.publish_date = publish_date;
                    newData.number_of_pages = number_of_pages;
                    newData.publishers = publishers;

                    if (
                        typeof description === 'object' &&
                        description !== null &&
                        'value' in description
                    ) {
                        newData.description = description.value;
                    } else {
                        newData.description = description;
                    }
                }
                setData(newData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        if (bookId) {
            fetchData();
        }
    }, [bookId]);

    useEffect(() => {
        const coverImage = coverImageRef.current;
        const infoBlock = infoBlockRef.current;

        if (coverImage && infoBlock && data) {
            handleImageLoad(coverImage, infoBlock);
        }
    }, [data]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${backendURL}/books/${bookId}`, {
                withCredentials: true,
            });
            setBookDeleted(true);
        } catch (error) {
            console.error('Error deleting book:', error);
            alert('Error deleting book');
        }
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    if (loading) {
        return (
            <div className={styles.Loading}>
                <div className={styles.loadingTochka}>
                    <div className={styles.tochka}></div>
                    <div className={styles.tochka}></div>
                    <div className={styles.tochka}></div>
                </div>
            </div>
        );
    }

    if (!data) {
        return <div>Data not found</div>;
    }

    return (
        <div className={styles.page_container}>
            <div className={styles.main_block}>
                <div className={styles.picture_block}>
                    <Image
                        ref={coverImageRef}
                        className="cover"
                        src={data.book.cover_url}
                        alt="Book Cover"
                        width={350} 
                        height={400}
                    />
                </div>
                <div className={styles.divider}></div>
                <div ref={infoBlockRef} className={styles.info_block}>
                    <div className={styles.overt}>
                        <h1 className={styles.book_name}>{data.book.title}</h1>
                        <div className={styles.book_info}>
                            {data.description && (
                                <p>
                                    Description:{' '}
                                    {showFullDescription
                                        ? data.description
                                        : `${data.description.substring(0, 50)}...`}
                                    {data.description.length > 50 && (
                                        <span
                                            className={
                                                styles.toggle_description
                                            }
                                            onClick={toggleDescription}
                                        >
                                            {showFullDescription
                                                ? ' | Show less'
                                                : ' | Show more'}
                                        </span>
                                    )}
                                </p>
                            )}
                            {data.book.authors && (
                                <p>Author: {data.book.authors}</p>
                            )}
                            {data.publishers && (
                                <p>Publisher: {data.publishers.join(', ')}</p>
                            )}
                            {data.publish_date && (
                                <p>Year: {data.publish_date}</p>
                            )}
                            {data.number_of_pages && (
                                <p>Number of Pages: {data.number_of_pages}</p>
                            )}
                        </div>
                        <div className={styles.user_info}>
                            <p>Owner of the book</p>
                            <p>Name: {data.owner.name}</p>
                            <p>City: {data.owner.city}</p>
                            <p>Number: {data.owner.phone_number}</p>
                            <p>Telegram: {data.owner.telegram_profile}</p>
                            {data?.is_owner &&
                                (bookDeleted ? (
                                    <p className={styles.deleted_message}>
                                        The book has been deleted
                                    </p>
                                ) : (
                                    <button
                                        className={styles.delete_button}
                                        onClick={handleDelete}
                                    >
                                        Delete Book
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookInfoPage;
