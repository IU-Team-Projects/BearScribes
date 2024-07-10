import React from 'react';
import styles from './Hero.module.scss';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>Book Sharing</h1>
        <p>Easier than ever</p>
        <button>Get Started</button>
      </div>
      <div className={styles.image}>
        <Image src="/books.png" alt="Books" width={500} height={500} />
      </div>
    </section>
  );
};

export default Hero;
