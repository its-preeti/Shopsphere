import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }

          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const containerStyle = {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "30px",
    background: "var(--card-bg)",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    color: "var(--text)",
  };

  const badgeStyle = {
    background: "rgba(249,115,22,0.1)",
    color: "var(--primary)",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    display: "inline-block",
  };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      {/* PROFILE HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "30px",
          marginBottom: "30px",
          gap: "20px",
        }}
      >
        <div>
          <h2
            style={{
              color: "var(--text)",
              fontSize: "2.2rem",
              marginBottom: "10px",
            }}
          >
            My Profile
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              marginBottom: "5px",
            }}
          >
            <strong>Name:</strong> {user.name}
          </p>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.2rem",
              marginBottom: "15px",
            }}
          >
            <strong>Email:</strong> {user.email}
          </p>

          <span style={badgeStyle}>
            Account Type: {user.role.toUpperCase()}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="btn"
          style={{
            background: "#ef4444",
            color: "#fff",
            boxShadow: "none",
            border: "none",
          }}
        >
          Logout
        </button>
      </div>

      {/* ORDER HISTORY */}

      <h3
        style={{
          color: "var(--primary)",
          marginBottom: "20px",
          fontSize: "1.5rem",
        }}
      >
        Order History
      </h3>

      {loading ? (
        <p
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Fetching your orders...
        </p>
      ) : orders.length === 0 ? (
        <div
          style={{
            background: "var(--bg-secondary)",
            padding: "30px",
            borderRadius: "8px",
            textAlign: "center",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "15px",
            }}
          >
            You haven't placed any orders yet.
          </p>

          <Link to="/shop" className="btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "var(--bg-secondary)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid var(--border)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    marginBottom: "5px",
                  }}
                >
                  Order ID:{" "}
                  <span style={{ color: "var(--text)" }}>
                    {order._id}
                  </span>
                </p>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    marginBottom: "5px",
                  }}
                >
                  Placed On:{" "}
                  <span style={{ color: "var(--text)" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  Total:{" "}
                  <strong style={{ color: "#10b981" }}>
                    ₹{Number(order.totalAmount).toFixed(2)}
                  </strong>
                </p>
              </div>

              {/* ORDER STATUS */}

              <div>
                <span
                  style={{
                    background:
                      order.status === "Delivered"
                        ? "rgba(16,185,129,0.1)"
                        : order.status === "Shipped"
                        ? "rgba(59,130,246,0.1)"
                        : "rgba(245,158,11,0.1)",

                    color:
                      order.status === "Delivered"
                        ? "#10b981"
                        : order.status === "Shipped"
                        ? "#3b82f6"
                        : "#f59e0b",

                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;