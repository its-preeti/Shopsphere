import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>ShopSphere</h3>
          <p>Premium E-Commerce Platform</p>
        </div>

        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/return-policy">Returns</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} ShopSphere
        </div>
      </div>
    </footer>
  );
};

export default Footer;