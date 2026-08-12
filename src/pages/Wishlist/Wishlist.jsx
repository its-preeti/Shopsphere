import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromWishlist,
  addToWishlist,
} from "../../redux/wishlistSlice";
import "./Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.wishlistItems
  );

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (item) => {
    // Optional: cart me add karne ke liye
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">

        

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h2>No Products In Wishlist ❤️</h2>

            <p>
              You haven't added any products to your wishlist yet.
            </p>

            <Link to="/shop" className="btn">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="wishlist-list">

            {wishlistItems.map((item) => (
              <div
                className="wishlist-item"
                key={item.productId}
              >

                <Link to={`/product/${item.productId}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="wishlist-image"
                  />
                </Link>

                <div className="wishlist-info">

                  <Link to={`/product/${item.productId}`}>
                    <h3>{item.name}</h3>
                  </Link>

                  <p className="wishlist-price">
                    ₹{Number(item.price).toFixed(2)}
                  </p>

                  <div className="wishlist-actions">

                    <button
                      className="btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        handleRemove(item.productId)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;