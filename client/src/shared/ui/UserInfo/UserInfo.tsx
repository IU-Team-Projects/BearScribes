import React from 'react';
import styles from './UserInfo.module.scss';
import UserInfoModel from '@/models/userInfo';

const UserInfo: React.FC<UserInfoModel> = ({
  name,
  city,
  phone_number,
  telegram_profile,
}) => {
  return (
    <div className={styles.userInfo}>
      <h2>{name}</h2>
      <p>City: {city}</p>
      <p>Phone: {phone_number}</p>
      <p>Telegram: {telegram_profile}</p>
    </div>
  );
};

export default UserInfo;
