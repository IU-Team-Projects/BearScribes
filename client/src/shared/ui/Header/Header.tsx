import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('access_token');
      setHasToken(!!token);
    }
  }, []);

  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined') {
      router.push(path);
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>BEAR SCRIBES</div>
      <div className={styles.actions}>
        {hasToken ? (
          <button
            className={styles.button}
            onClick={() => handleNavigation('/library')}
          >
            My Library
          </button>
        ) : (
          <>
            <button
              className={styles.button}
              onClick={() => handleNavigation('/signup')}
            >
              Sign Up
            </button>
            <button
              className={styles.button}
              onClick={() => handleNavigation('/login')}
            >
              Log in
            </button>

          </>
        )}
      </div>
    </header>
  );
};

export default Header;

