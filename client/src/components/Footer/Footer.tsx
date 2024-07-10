import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div>
          <h3>BEAR SCRIBES</h3>
          <form>
            <label htmlFor="email">Updates right to your inbox</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div>
          <h3>Our Story</h3>
          <ul>
            <li>
              <a href="mailto:a.mukhutdinov@innopolis.university">Contact</a>
            </li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <h3>SharePoint</h3>
          <ul>
            <li>
              <a href="/books">Books</a>
            </li>
            <li>
              <a href="/my-library">My Library</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© BEAR SCRIBES 2024</span>
        <span>Privacy policy</span>
        <span>Terms of use</span>
      </div>
    </footer>
  );
};

export default Footer;
