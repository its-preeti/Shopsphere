import "./Wishlist.css";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";

function Wishlist() {

  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (

    <div className="wishlist-page">

      <div className="wishlist-container">

        <h1 className="wishlist-title">
          My Wishlist ❤️
        </h1>
 <br />

        {wishlistItems.length === 0 ? (

          <h2 className="empty-wishlist">
            No Products In Wishlist
          </h2>

        ) : (

          wishlistItems.map((item) => (

            <div
              className="wishlist-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div>

                <h3>{item.title}</h3>

                <p>₹{item.price}</p>

                <button
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default Wishlist;