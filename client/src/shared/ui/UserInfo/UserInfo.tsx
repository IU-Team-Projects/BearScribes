import React, { useState } from 'react';
import styles from './UserInfo.module.scss';
import UserInfoModel from '@/models/userInfo';

const UserInfo: React.FC<UserInfoModel> = ({
    name,
    city,
    phone_number,
    telegram_profile,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTelegramProfile, setNewTelegramProfile] =
        useState(telegram_profile);
    const [currentTelegramProfile, setCurrentTelegramProfile] =
        useState(telegram_profile);
    const [message, setMessage] = useState('');

    const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTelegramProfile(event.target.value);
    };

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${backendURL}/auth/update_telegram?new_telegram_profile=${newTelegramProfile}`,
                {
                    method: 'PUT',
                    headers: {
                        accept: 'application/json',
                    },
                    credentials: 'include',
                },
            );
            if (!response.ok) {
                throw new Error('Failed to update Telegram profile');
            }
            const updatedUserInfo = await response.json();
            setCurrentTelegramProfile(updatedUserInfo.telegram_profile);
            setIsEditing(false);
            setMessage('Telegram profile updated successfully!');
        } catch (error) {
            console.error('Error updating Telegram profile:', error);
            setMessage('Failed to update Telegram profile');
        }
    };

    return (
        <div data-testid="userinfo" className={styles.userInfo}>
            <h2>{name}</h2>
            <p>City: {city}</p>
            <p>Phone: {phone_number}</p>
            <p>
                Telegram:{' '}
                {isEditing ? (
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        <input
                            type="text"
                            value={newTelegramProfile}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <span onClick={handleEditClick} className={styles.editable}>
                        {currentTelegramProfile}
                    </span>
                )}
            </p>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default UserInfo;
