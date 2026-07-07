import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-logo">
        <h2>ShopSphere</h2>
      </div>

      <div className="footer-content">

        <p>Premium E-Commerce Platform.</p>

        <div className="footer-links">
          <Link to="/about">About Us</Link>

          <Link to="/return-policy">
            Return Policy
          </Link>

          <Link to="/disclaimer">
            Disclaimer
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

        <p>© 2026 ShopSphere. All rights reserved.</p>

      </div>

    </footer>
  );
}

export default Footer;