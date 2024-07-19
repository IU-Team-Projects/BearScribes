import React, {useState,useEffect} from 'react';
import styles from './Footer.module.scss';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


const Footer: React.FC = () => {

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
            <li>

            </li>
          </ul>
        </div>
        <div>
          <h3>SharePoint</h3>
          <ul>
            {hasToken && (
              <>
                <li>
                  <button
                    className={styles.linkButton}
                    onClick={() => handleNavigation('/books')}
                  >
                    Books
                  </button>
                </li>
                <li>
                  <button
                    className={styles.linkButton}
                    onClick={() => handleNavigation('/library')}
                  >
                    My Library
                  </button>
                </li>
              </>
            )}
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
