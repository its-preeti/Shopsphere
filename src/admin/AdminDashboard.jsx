import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('https://shopsphere-p1l8.onrender.com/api/analytics', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }

          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [user, navigate]);

  /* =========================
     THEME BASED STYLES
  ========================= */

  const pageStyle = {
    padding: '30px 20px 50px',
    maxWidth: '1100px',
    margin: '0 auto',
    color: 'var(--text)',
    background: 'var(--bg)',
    transition: 'all 0.3s ease'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '5px'
  };

  const logoStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '8px',
    objectFit: 'cover',
    filter: 'drop-shadow(0 0px 10px rgba(249, 115, 22, 0.3))'
  };

  const headingStyle = {
    margin: 0,
    color: 'var(--text)',
    fontSize: '28px'
  };

  const welcomeStyle = {
    color: 'var(--text-muted)',
    marginBottom: '30px',
    fontSize: '1.1rem'
  };

  const nameStyle = {
    color: 'var(--text)',
    fontWeight: '600'
  };

  const cardStyle = {
    padding: '25px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    boxShadow: '0 8px 25px var(--shadow)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s ease'
  };

  const cardTitleStyle = {
    color: 'var(--text-muted)',
    fontSize: '1rem',
    margin: 0
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--primary)'
  };

  const controlsStyle = {
    marginTop: '40px',
    padding: '30px',
    background: 'var(--card-bg)',
    borderRadius: '14px',
    border: '1px solid var(--border)',
    boxShadow: '0 8px 25px var(--shadow)',
    transition: 'all 0.3s ease'
  };

  const controlsTitleStyle = {
    marginBottom: '25px',
    color: 'var(--primary)'
  };

  const controlsContainerStyle = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  };

  const secondaryButtonStyle = {
    background: 'var(--input-bg)',
    color: 'var(--text)',
    border: '1px solid var(--border)'
  };

  return (
    <div style={pageStyle}>

      {/* =========================
          HEADER
      ========================= */}

      <div style={headerStyle}>

        <img
          src="https://i.pinimg.com/1200x/c8/5c/4c/c85c4cc81847cc51ff6e21ad0f71eb0d.jpg"
          alt="Logo"
          style={logoStyle}
        />

        <h2 style={headingStyle}>
          Admin Dashboard
        </h2>

      </div>

      <p style={welcomeStyle}>
        Welcome back,{' '}
        <span style={nameStyle}>
          {user?.name}
        </span>
      </p>


      {/* =========================
          STATISTICS
      ========================= */}

      {stats ? (

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}
        >

          {/* TOTAL ORDERS */}

          <div style={cardStyle}>

            <h4 style={cardTitleStyle}>
              Total Orders
            </h4>

            <div style={numberStyle}>
              {stats.totalOrders}
            </div>

          </div>


          {/* TOTAL PRODUCTS */}

          <div style={cardStyle}>

            <h4 style={cardTitleStyle}>
              Total Products
            </h4>

            <div style={numberStyle}>
              {stats.totalProducts}
            </div>

          </div>


          {/* TOTAL USERS */}

          <div style={cardStyle}>

            <h4 style={cardTitleStyle}>
              Total Users
            </h4>

            <div style={numberStyle}>
              {stats.totalUsers}
            </div>

          </div>


          {/* TOTAL REVENUE */}

          <div style={cardStyle}>

            <h4 style={cardTitleStyle}>
              Total Revenue
            </h4>

            <div style={numberStyle}>
              ₹{stats.totalRevenue.toFixed(2)}
            </div>

          </div>

        </div>

      ) : (

        <div
          style={{
            textAlign: 'center',
            margin: '50px 0',
            color: 'var(--primary)'
          }}
        >
          Loading metrics...
        </div>

      )}


      {/* =========================
          ADMIN CONTROLS
      ========================= */}

      <div style={controlsStyle}>

        <h3 style={controlsTitleStyle}>
          Administrative Controls
        </h3>

        <div style={controlsContainerStyle}>

          {/* ADD PRODUCT */}

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/add-product')
            }
          >
            + Add Product
          </button>


          {/* MANAGE PRODUCTS */}

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/products')
            }
            style={secondaryButtonStyle}
          >
            📦 Manage Products
          </button>


          {/* MANAGE ORDERS */}

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/orders')
            }
            style={secondaryButtonStyle}
          >
            🚚 Manage Orders
          </button>


          {/* USERS */}

          <button
            className="btn"
            onClick={() =>
              navigate('/admin/users')
            }
            style={secondaryButtonStyle}
          >
            👥 Users Directory
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;