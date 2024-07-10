import React from 'react';
import styles from './Testimonial.module.scss';

const Testimonial: React.FC = () => {
  return (
    <section className={styles.testimonial}>
      <div className={styles.profile}>
        <img src="/profile.jpg" alt="Eldar" />
        <p>Очень умные слова про книги</p>
        <span>Eldar</span>
      </div>
    </section>
  );
};

export default Testimonial;
