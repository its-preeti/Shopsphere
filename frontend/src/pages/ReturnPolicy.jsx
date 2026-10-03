import React from "react";
import "./Pages.css";

const ReturnPolicy = () => {
  return (
    <div className="page-container">
      <div className="page-card">
        <div className="page-header">
          <span className="page-label">SHOPSPHERE POLICY</span>
          <h1>Return Policy</h1>
          <p>
            Your satisfaction is our priority. Please read our return and
            refund policy carefully before requesting a return.
          </p>
        </div>

        <div className="policy-section">
          <h2>📦 Return Eligibility</h2>
          <ul>
            <li>Return request must be submitted within 7 days of delivery.</li>
            <li>Product must be unused and in its original packaging.</li>
            <li>Invoice or order confirmation must be available.</li>
            <li>All accessories, manuals and original items must be included.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>💰 Refund Process</h2>
          <ul>
            <li>Returned product will be inspected within 2–3 business days.</li>
            <li>Approved refunds are processed within 5–7 business days.</li>
            <li>Refund will be sent to the original payment method.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>❌ Non-Returnable Items</h2>
          <ul>
            <li>Opened personal care products.</li>
            <li>Gift cards and digital products.</li>
            <li>Products damaged because of customer misuse.</li>
            <li>Products without original packaging or accessories.</li>
          </ul>
        </div>

        <div className="policy-note">
          <strong>Need help with a return?</strong>
          <p>
            Contact our support team with your order ID and reason for return.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;