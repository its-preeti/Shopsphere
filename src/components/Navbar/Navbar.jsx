import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import {
  FiMenu,
  FiX,
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiBarChart2,
  FiPackage,
} from "react-icons/fi";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Navbar() {

  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="navbar">

      {/* Logo */}
      <div className="logo">

        <img
          src="https://cdn-icons-png.flaticon.com/128/10856/10856545.png"
          alt="logo"
        />

        <h1>
          <span>ShopSphere</span>
        </h1>

        <div className="dot"></div>

      </div>

      {/* NAV LINKS */}

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

        <li>
          <Link to="/">
            <FiHome />
            Home
          </Link>
        </li>

        <li>
          <Link to="/products">
            <FiShoppingBag />
            Products
          </Link>
        </li>

        <li>
          <Link to="/cart">
            <FiShoppingCart />
            Cart

            <span className="badge">
              {cartItems.length}
            </span>

          </Link>
        </li>

        <li>
          <Link to="/wishlist">
            <FiHeart />
            Wishlist

            <span className="badge">
              {wishlistItems.length}
            </span>

          </Link>
        </li>

        <li>
          <Link to="/analytics">
            <FiBarChart2 />
            Admin
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <FiPackage />
            Orders
          </Link>
        </li>

        <li>
          <Link to="/auth" className="login-btn">
            <FiUser />
            Account
          </Link>
        </li>

        <li>
          <ThemeToggle />
        </li>

      </ul>

      {/* MOBILE MENU */}

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >

        {menuOpen ? <FiX /> : <FiMenu />}

      </div>

    </nav>

  );
}

export default Navbar;