import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import API from "../services/api";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.qty),
    0
  );

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // CREATE RAZORPAY ORDER
      // =========================

      const orderRes = await API.post("/payment/order", {
        amount: totalPrice,
      });

      const orderData = orderRes.data;

      console.log("Payment Order:", orderData);

      if (!orderData) {
        alert("Payment could not be initialized.");
        return;
      }

      // =========================
      // CHECK RAZORPAY
      // =========================

      if (!window.Razorpay) {
        alert(
          "Razorpay is not loaded. Please check Razorpay script."
        );
        return;
      }

      // =========================
      // RAZORPAY OPTIONS
      // =========================

      const options = {
        key:
          orderData.key ||
          "rzp_test_T5XcZKRMPuHhZd",

        amount: orderData.amount,

        currency:
          orderData.currency || "INR",

        name: "ShopSphere",

        description: "ShopSphere Order",

        order_id: orderData.id,

        handler: async (response) => {
          try {
            console.log(
              "Razorpay Response:",
              response
            );

            // =========================
            // VERIFY PAYMENT
            // =========================

            const verifyRes = await API.post(
              "/payment/verify",
              response
            );

            const verifyData = verifyRes.data;

            console.log(
              "Payment Verification:",
              verifyData
            );

            if (!verifyData) {
              alert(
                "Payment verification failed"
              );
              return;
            }

            // =========================
            // SAVE ORDER
            // =========================

            const saveOrderRes = await API.post(
              "/orders",
              {
                items: cartItems.map((item) => ({
                  productId: item.productId,
                  qty: Number(item.qty),
                  price: Number(item.price),
                })),

                totalAmount: totalPrice,

                address,

                paymentId:
                  response.razorpay_payment_id,
              }
            );

            const savedOrder =
              saveOrderRes.data;

            console.log(
              "Saved Order:",
              savedOrder
            );

            // =========================
            // SUCCESS
            // =========================

            if (saveOrderRes.status >= 200 && saveOrderRes.status < 300) {
              dispatch(clearCart());

              alert(
                "Payment Successful & Order Placed! 🎉"
              );

              navigate("/ordersuccess");
            } else {
              alert(
                savedOrder?.message ||
                  "Order saving failed"
              );
            }
          } catch (error) {
            console.error(
              "Payment Handler Error:",
              error
            );

            alert(
              error.response?.data?.message ||
                "Something went wrong after payment."
            );
          }
        },

        prefill: {
          name: address.fullName,

          email:
            user?.email || "",

          contact:
            "9999999999",
        },

        theme: {
          color: "#ea580c",
        },

        modal: {
          ondismiss: () => {
            console.log(
              "Razorpay payment window closed"
            );
          },
        },
      };

      // =========================
      // OPEN RAZORPAY
      // =========================

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to start payment. Check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    handlePayment();
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        Checkout
      </h1>

      <h3 style={subtitleStyle}>
        Shipping Address
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={address.fullName}
          onChange={(e) =>
            setAddress({
              ...address,
              fullName: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Street"
          required
          value={address.street}
          onChange={(e) =>
            setAddress({
              ...address,
              street: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="City"
          required
          value={address.city}
          onChange={(e) =>
            setAddress({
              ...address,
              city: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Postal Code"
          required
          value={address.postalCode}
          onChange={(e) =>
            setAddress({
              ...address,
              postalCode: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Country"
          required
          value={address.country}
          onChange={(e) =>
            setAddress({
              ...address,
              country: e.target.value,
            })
          }
          style={inputStyle}
        />

        <h2 style={totalStyle}>
          Total to Pay: ₹
          {totalPrice.toFixed(2)}
        </h2>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            background: loading
              ? "var(--text-muted)"
              : "var(--primary)",
            cursor: loading
              ? "not-allowed"
              : "pointer",
          }}
        >
          {loading
            ? "Processing..."
            : "💳 Pay Now"}
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: "700px",
  margin: "50px auto",
  padding: "30px",
  background: "var(--card-bg)",
  border: "1px solid var(--border)",
  borderRadius: "15px",
  color: "var(--text)",
  boxShadow: "0 12px 35px var(--shadow)",
};

const titleStyle = {
  marginTop: 0,
  color: "var(--primary)",
};

const subtitleStyle = {
  marginTop: "30px",
  color: "var(--text)",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px",
  marginTop: "15px",
  background: "var(--input-bg)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: "7px",
  fontSize: "15px",
  outline: "none",
};

const totalStyle = {
  marginTop: "25px",
  marginBottom: "20px",
  color: "var(--text)",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  fontWeight: "bold",
  transition: "0.3s ease",
};

export default Checkout;