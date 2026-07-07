import { useState } from "react";
import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const productsData = [
  {
    id: 1,
    title: "Men's Shirt",
    category: "Fashion",
    price: 1999,
    image:
      "https://i.pinimg.com/originals/69/5b/32/695b3298ac18fd0da27cf727b7d8cf4a.jpg",
  },
  {
    id: 2,
    title: "Women's Dress",
    category: "Fashion",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
  },
  {
    id: 3,
    title: "Sports Shoes",
    category: "Shoes",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 4,
    title: "Smart Watch",
    category: "Electronics",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  let filteredProducts = productsData.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||
      product.category === category;

    const matchPrice =
      product.price <= maxPrice;

    return (
      matchSearch &&
      matchCategory &&
      matchPrice
    );
  });

  // Sorting
  if (sort === "low-high") {
    filteredProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high-low") {
    filteredProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <div className="products">
      <h2>Featured Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        className="search-box"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="advanced-filters">
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="low-high">
            Price Low To High
          </option>

          <option value="high-low">
            Price High To Low
          </option>
        </select>

        <br />
        <br />

        <input
          type="range"
          min="500"
          max="10000"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
        />

        <p>Max Price: ₹{maxPrice}</p>
      </div>

      <div className="filter-buttons">
        <button
          onClick={() => setCategory("All")}
        >
          All
        </button>

        <button
          onClick={() =>
            setCategory("Fashion")
          }
        >
          Fashion
        </button>

        <button
          onClick={() =>
            setCategory("Shoes")
          }
        >
          Shoes
        </button>

        <button
          onClick={() =>
            setCategory("Electronics")
          }
        >
          Electronics
        </button>
      </div>
      <br/>
      <br/>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;