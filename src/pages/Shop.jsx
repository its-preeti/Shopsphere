import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import API from "../services/api";
import "../styles/product.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products");

        const data = response.data;

        console.log("SHOP PRODUCTS:", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("SHOP ERROR:", error);
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
    <div className="shop-container">
      <h2>All Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {loading ? (
        <div>Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div>No products available.</div>
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
    </div>
  );
};

export default Shop;