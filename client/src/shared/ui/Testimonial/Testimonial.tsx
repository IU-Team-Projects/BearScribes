import React from 'react';
import styles from './Testimonial.module.scss';
import Image from 'next/image';

const Testimonial: React.FC = () => {
  return (
    <section className={styles.testimonial}>
      <div className={styles.profile}>
        <Image src="/profile.jpg" alt="Eldar" width={500} height={500} />
        <p>Очень умные слова про книги</p>
        <span>Eldar</span>
      </div>
    </section>
  );
};

export default Testimonial;
