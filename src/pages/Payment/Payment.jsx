import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Payment.css";

function Payment() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("card");

  const navigate = useNavigate();

  // PAYMENT FUNCTION

  const handlePayment = () => {
    // LOGIN CHECK

    if (!user) {
      alert("Please Login First 🔒");

      navigate("/auth");

      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_T5XcZKRMPuHhZd",

      amount: 149900,

      currency: "INR",

      name: "ShopSphere",

      description: "Order Payment",

      image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",

      handler: function () {
        setLoading(false);

        alert("Payment Successful ✅");

        navigate("/success");
      },

      prefill: {
        name: user?.name || "Customer",

        email: user?.email || "customer@gmail.com",

        contact: "9999999999",
      },

      theme: {
        color: "#1e3a8a",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

    razorpay.on(
      "payment.failed",

      function () {
        setLoading(false);

        alert("Payment Failed ❌");
      },
    );
  };

  return (
    <div className="payment">
      <div className="payment-box">
        <h1>💳 Payment</h1>

        {/* PAYMENT METHODS */}

        <div className="payment-methods">
          <button
            className={paymentMethod === "card" ? "active-method" : ""}
            onClick={() => setPaymentMethod("card")}
          >
            Card
          </button>

          <button
            className={paymentMethod === "upi" ? "active-method" : ""}
            onClick={() => setPaymentMethod("upi")}
          >
            UPI
          </button>

          <button
            className={paymentMethod === "qr" ? "active-method" : ""}
            onClick={() => setPaymentMethod("qr")}
          >
            QR Code
          </button>
        </div>

        {/* CARD PAYMENT */}

        {paymentMethod === "card" && (
          <>
            <input type="text" placeholder="Card Holder Name" />

            <input type="text" placeholder="Card Number" />

            <div className="payment-row">
              <input type="text" placeholder="MM/YY" />

              <input type="password" placeholder="CVV" />
            </div>
          </>
        )}

        {/* UPI PAYMENT */}

        {paymentMethod === "upi" && (
          <>
            <div className="upi-apps">
              <div className="upi-card">Google Pay</div>

              <div className="upi-card">PhonePe</div>

              <div className="upi-card">Paytm</div>
            </div>

            <input type="text" placeholder="Enter UPI ID" />
          </>
        )}

        {/* QR PAYMENT */}

        {paymentMethod === "qr" && (
          <div className="qr-payment">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ShopSpherePayment"
              alt="QR Code"
            />

            <h3>Scan & Pay</h3>

            <p>Use any UPI app to scan this QR.</p>
          </div>
        )}

        {/* PAY BUTTON */}

        <button className="pay-btn" onClick={handlePayment}>
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* LOADER */}

        {loading && (
          <div className="loader">
            <div className="spinner"></div>

            <p>Processing Payment...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
