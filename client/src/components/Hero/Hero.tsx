import React from 'react';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>Book Sharing</h1>
        <p>Easier than ever</p>
        <button>Get Started</button>
      </div>
      <div className={styles.image}>
        <img src="/books.png" alt="Books" />
      </div>
    </section>
  );
};

export default Hero;
