import React, { useEffect, useState } from 'react';
import { getCookies, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    const [hasToken, setHasToken] = useState(false);
    const router = useRouter();
    const pathname = usePathname() as string;
    const isLibraryPage = pathname.match('/library');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getCookie('is_authorized');
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
                    isLibraryPage ? (
                        <>
                            <button
                                className={styles.button}
                                onClick={() => handleNavigation('/searchBooks')}
                            >
                                Add new book
                            </button>
                            <button
                                className={styles.button}
                                onClick={() => handleNavigation('/items')}
                            >
                                Books
                            </button>
                        </>
                    ) : (
                        <button
                            className={styles.button}
                            onClick={() => handleNavigation('/library')}
                        >
                            My Library
                        </button>
                    )
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
