import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="items-footer">
      <div className="items-footer-top">
        <div>
          <h2 className="items-footer-bear-scribes">Bear Scribes</h2>
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
          <h3>Our story</h3>
          <ul>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3>SharePoint</h3>
          <ul>
            <li>Books</li>
            <li>My Library</li>
          </ul>
        </div>
      </div>
      <div className="items-footer-bottom">
        <span>© BEAR SCRIBES 2024</span>
        <span>Privacy policy</span>
        <span>Terms of use</span>
      </div>
    </footer>
  );
};

export default Footer;
