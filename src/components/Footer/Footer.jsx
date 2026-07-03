import "./Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        <div className="footer-logo">
          <h2>ShopSphere</h2>

          <p>Premium E-Commerce Platform.</p>
        </div>

        <div className="footer-links">
          <a href="/">About Us</a>
          <a href="/">Return Policy</a>
          <a href="/">Disclaimer</a>
        </div>

      </div>

      <p className="footer-bottom">
        ©2026 ShopSphere. All rights reserved.
      </p>

    </footer>

  );
}

export default Footer;