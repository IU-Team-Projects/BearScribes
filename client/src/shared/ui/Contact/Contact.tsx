import React from 'react';
import styles from './Contact.module.scss';
import Image from 'next/image';

const Contact: React.FC = () => {
  const handleContactUs = () => {
    window.location.href = 'mailto:a.mukhutdinov@innopolis.university';
  };

  return (
    <section className={styles.contact}>
      <div className={styles.text}>
        <h2>Wanna talk?</h2>
        <p>You can ask us questions about the service and books</p>
        <button className={styles.linkButton} onClick={handleContactUs}>
          Contact us
        </button>
      </div>
      <div className={styles.icon}>
        <Image src="/lightbulb.png" alt="Contact" width={500} height={500} />
      </div>
    </section>
  );
};

export default Contact;
