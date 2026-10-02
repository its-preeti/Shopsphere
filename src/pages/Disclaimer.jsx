import "./Pages.css";

function Disclaimer() {
  return (
    <div className="page-container">

      <div className="page-card">

        <h1>Disclaimer</h1>

        <p>
          The information provided on ShopSphere is intended for general
          informational purposes only.
        </p>

        <h2>📌 Important Information</h2>

        <ul>
          <li>✔ Product images are for reference only.</li>
          <li>✔ Product specifications may change without notice.</li>
          <li>✔ Prices and offers are subject to availability.</li>
          <li>✔ We are not responsible for third-party websites linked from our platform.</li>
        </ul>

        <h2>⚠ Limitation of Liability</h2>

        <ul>
          <li>✔ ShopSphere is not liable for indirect or incidental damages.</li>
          <li>✔ Users are responsible for maintaining account confidentiality.</li>
          <li>✔ Continued use of the website indicates acceptance of our policies.</li>
        </ul>

        <h2>📞 Contact</h2>

        <p>
          For any questions regarding this disclaimer, please contact our
          customer support team.
        </p>

      </div>

    </div>
  );
}

export default Disclaimer;