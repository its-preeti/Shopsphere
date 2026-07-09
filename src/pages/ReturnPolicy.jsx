import "./Pages.css";

function ReturnPolicy() {
  return (
    <div className="page-container">

      <div className="page-card">

        <h1>Return Policy</h1>

        <p>
          Your satisfaction is our highest priority. If you are not completely
          satisfied with your purchase, you may request a return under the
          following conditions.
        </p>

        <h2>📦 Return Eligibility</h2>

        <ul>
          <li>✔ Return request within 7 days of delivery.</li>
          <li>✔ Product must be unused and in original packaging.</li>
          <li>✔ Invoice or order confirmation is required.</li>
          <li>✔ Accessories and manuals should be included.</li>
        </ul>

        <h2>💰 Refund Process</h2>

        <ul>
          <li>✔ Product inspection within 2–3 business days.</li>
          <li>✔ Refund processed within 5–7 business days.</li>
          <li>✔ Refund credited to the original payment method.</li>
        </ul>

        <h2>❌ Non-Returnable Items</h2>

        <ul>
          <li>Opened personal care products.</li>
          <li>Gift cards.</li>
          <li>Products damaged by customer misuse.</li>
        </ul>

      </div>

    </div>
  );
}

export default ReturnPolicy;