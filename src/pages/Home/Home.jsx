import "./Home.css";

function Home() {

  return (

    <div className="home">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-box">

          <h1>
            Welcome <br />
            to ShopSphere
          </h1>

          <p>
            Discover the latest products at the best prices.
          </p>

          <div className="hero-buttons">

            <button className="shop-btn">
              Shop Now
            </button>

            <button className="explore-btn">
              Explore
            </button>

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="categories">

        <h2>
          Categories
        </h2>

        <div className="categories-container">

          <div className="category-card">
            Electronics
          </div>

          <div className="category-card">
            Fashion
          </div>

          <div className="category-card">
            Shoes
          </div>

          <div className="category-card">
            Watches
          </div>

        </div>

      </section>

    </div>

  );

}

export default Home;