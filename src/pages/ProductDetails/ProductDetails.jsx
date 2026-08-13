import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";

import Reviews from "../../components/Reviews/Reviews";
import API from "../../services/api";
import "../../styles/product.css";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);

        console.log("Product Details:", response.data);

        setProduct(response.data);
      } catch (error) {
        console.error("Product fetch error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );

    alert("Successfully added to your cart! 🛒");
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    dispatch(
      addToWishlist({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      })
    );

    alert("❤️ Successfully added to Wishlist!");
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "100px",
          color: "#f97316",
        }}
      >
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "100px",
          color: "#ef4444",
        }}
      >
        Product Not Found
      </div>
    );
  }

  return (
    <div
      className="product-detail-wrapper"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          color: "var(--text-soft)",
          marginBottom: "20px",
          fontSize: "0.95rem",
        }}
      >
        <Link to="/" style={{ color: "#f97316" }}>
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" style={{ color: "#f97316" }}>
          Shop
        </Link>{" "}
        / {product.category} /{" "}
        <span style={{ color: "var(--text)" }}>
          {product.name}
        </span>
      </div>

      <div className="product-detail">
        <div className="detail-image-container">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x500?text=No+Image";
            }}
          />
        </div>

        <div className="detail-info">
          <h2
            style={{
              fontSize: "2.8rem",
              marginBottom: "10px",
              color: "var(--text)",
            }}
          >
            {product.name}
          </h2>

          <p
            className="detail-price"
            style={{
              fontSize: "2.5rem",
              margin: "15px 0",
            }}
          >
            ₹{Number(product.price).toFixed(2)}
          </p>

          <div style={{ marginBottom: "25px" }}>
            <h4
              style={{
                color: "var(--text)",
                marginBottom: "10px",
              }}
            >
              Product Description
            </h4>

            <p
              style={{
                color: "var(--text-soft)",
                lineHeight: "1.8",
              }}
            >
              {product.description}
            </p>
          </div>

          <p
            style={{
              color: "var(--text-soft)",
              marginBottom: "10px",
            }}
          >
            Category:{" "}
            <strong style={{ color: "var(--text)" }}>
              {product.category}
            </strong>
          </p>

          <p
            style={{
              color: "#f59e0b",
              marginBottom: "20px",
            }}
          >
            ⭐ {product.ratings || 0} / 5 (
            {product.numReviews || 0} reviews)
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <button
              onClick={handleAddToCart}
              className="btn"
              style={{
                flexGrow: 1,
                padding: "18px",
                fontSize: "1.2rem",
              }}
            >
              🛒 Add to Shopping Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="btn"
              style={{
                padding: "18px",
                background: "#e91e63",
                color: "#fff",
                fontSize: "1.2rem",
              }}
            >
              ❤️ Wishlist
            </button>
          </div>

          <p
            style={{
              marginTop: "20px",
              color:
                product.stock > 0
                  ? "#10b981"
                  : "#ef4444",
              fontWeight: "600",
            }}
          >
            {product.stock > 0
              ? `● In Stock (${product.stock} units available)`
              : "● Temporarily Out of Stock"}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "50px" }}>
        <Reviews productId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetail;