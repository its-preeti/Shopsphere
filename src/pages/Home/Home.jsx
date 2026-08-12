import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import API from "../../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products");

        const data = response.data;

        const latestProducts = [...data].reverse().slice(0, 4);

        setProducts(latestProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    String(product?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="hero-banner">
        <div className="hero-content">
          <span className="hero-label">
            WELCOME TO SHOPSPHERE
          </span>

          <h1>
            Find something
            <br />
            <span>worth keeping.</span>
          </h1>

          <p>
            Discover thoughtfully selected products designed to bring
            style, comfort and quality into your everyday life.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="hero-btn primary">
              Shop Now →
            </Link>

            <Link to="/shop" className="hero-btn secondary">
              Explore Collection ↗
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="all-products-title">
          All Products
        </h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <div className="section-heading">
          <div>
            <span className="section-label">
              OUR PICKS
            </span>

            <h2>
              Featured Products
            </h2>
          </div>

          <Link to="/shop" className="view-all">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="loading">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="loading">
            No products found.
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;