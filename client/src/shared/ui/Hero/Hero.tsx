import React, { useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
  const [, setHasToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('access_token');
      setHasToken(!!token);
    }
  }, []);

  const handleGetStarted = () => {
    if (typeof window !== 'undefined') {
      router.push('/items');
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>Book Sharing</h1>
        <p>Easier than ever</p>
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
      <div className={styles.image}>
        <Image src="/books.png" alt="Books" width={500} height={500} />
      </div>
    </section>
  );
};

export default Hero;
