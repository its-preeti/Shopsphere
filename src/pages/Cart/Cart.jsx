import "./Cart.css";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart 🛍️</h1>

      {cartItems.length === 0 ? (
        <h2 className="empty-cart">🛒 Your Cart Is Empty</h2>
      ) : (
        <div className="cart-container">

          {/* LEFT SIDE */}

          <div className="cart-items">

            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>

                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-image"
                />

                <div className="cart-details">

                  <h2>{item.title}</h2>

                  <p className="cart-price">
                    ₹{item.price}
                  </p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                    >
                      -
                    </button>

                    <span className="quantity-number">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* RIGHT SIDE */}

          <div className="cart-summary">

            <h2>
              Total: ₹{total}
            </h2>

            <hr />

            <div className="summary-buttons">

              <button
                className="checkout-btn"
                onClick={() =>
                  navigate("/payment")
                }
              >
                Proceed to Checkout
              </button>

              <button
                className="clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;