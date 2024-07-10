import React from 'react';
import styles from './Contact.module.scss';

const Contact: React.FC = () => {
  return (
    <section className={styles.contact}>
      <div className={styles.text}>
        <h2>Wanna talk?</h2>
        <p>You can ask us questions about the service and books</p>
        <button>Contact us</button>
      </div>
      <div className={styles.icon}>
        <img src="/lightbulb.png" alt="Contact" />
      </div>
    </section>
  );
};

export default Contact;
