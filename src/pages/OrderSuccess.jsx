import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '50px 30px',
    background: 'var(--card-bg)',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    boxShadow: '0 10px 40px var(--shadow)',
    textAlign: 'center',
    color: 'var(--text)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          color: 'var(--success)'
        }}
      >
        Payment Successful!
      </h2>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '1.2rem',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}
      >
        Thank you for your order. We have securely received your payment and will process your shipment shortly.
      </p>

      <Link to="/shop" className="btn">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;