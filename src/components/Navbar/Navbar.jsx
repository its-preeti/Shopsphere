import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "../../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-brand">
        <Link to="/">
          <img
  src="https://i.pinimg.com/1200x/c8/5c/4c/c85c4cc81847cc51ff6e21ad0f71eb0d.jpg"
  alt="ShopSphere"
  className="navbar-logo"
/>

          <span className="brand-name">
            ShopSphere
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ul className="navbar-links">

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li>
          <Link to="/cart">
            Cart{" "}
            <span className="nav-count">
              {cartItems.length}
            </span>
          </Link>
        </li>

        <li>
          <Link to="/wishlist">
            Wishlist{" "}
            <span className="nav-count">
              {wishlistItems.length}
            </span>
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile" className="user-link">
                Hi, {user.name}
              </Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="btn-logout"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        {/* Theme Toggle */}
        <li>
          <ThemeToggle />
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;