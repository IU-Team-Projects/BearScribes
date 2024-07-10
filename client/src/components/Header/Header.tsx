import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>BEAR SCRIBES</div>
      <div className={styles.actions}>
        <button>Sign Up</button>
        <button>Log in</button>
      </div>
    </header>
  );
};

export default Header;
