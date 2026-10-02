import React from "react";
import { Link } from "react-router-dom";
import "../../styles/product.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="product-info">

        <h3>{product.name}</h3>

        <p className="product-price">
          ₹{Number(product.price).toFixed(2)}
        </p>

        <p className="product-category">
          {product.category}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="btn"
        >
          View Details →
        </Link>

      </div>
    </div>
  );
};

export default ProductCard;