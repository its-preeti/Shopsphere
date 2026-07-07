import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-box">

          <h1>
            Welcome to ShopSphere
          </h1>

          <p>
            Discover the latest products at the best prices.
          </p>

          <div className="hero-buttons">

            <button
              className="shop-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>

            <button
              className="explore-btn"
              onClick={() => navigate("/products")}
            >
              Explore
            </button>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="categories">

        <h2>Categories</h2>

        <div className="categories-container">

          <div className="category-card">Electronics</div>

          <div className="category-card">Fashion</div>

          <div className="category-card">Shoes</div>

          <div className="category-card">Watches</div>

        </div>

      </section>

    </div>
  );
}

export default Home;