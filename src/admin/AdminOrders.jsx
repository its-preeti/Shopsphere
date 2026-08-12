import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        console.log("ADMIN ORDERS RESPONSE:", data);
        console.log("STATUS:", res.status);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("FETCH ORDERS ERROR:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    if (!user?.token) {
      alert("Please login again");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Status update failed");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (error) {
      console.error("STATUS UPDATE ERROR:", error);
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Manage Orders</h2>
        <p style={emptyStyle}>Loading orders...</p>
      </div>
    );
  }

  if (!user?.token) {
    return (
      <div style={containerStyle}>
        <h2 style={titleStyle}>Manage Orders</h2>
        <p style={emptyStyle}>
          Please login to view orders.
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Manage Orders</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ORDER ID</th>
              <th style={thStyle}>USER</th>
              <th style={thStyle}>TOTAL</th>
              <th style={thStyle}>DATE</th>
              <th style={thStyle}>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" style={emptyStyle}>
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} style={rowStyle}>
                  <td style={tdStyle}>
                    {order._id
                      ? `${order._id.substring(0, 8)}...`
                      : "-"}
                  </td>

                  <td style={tdStyle}>
                    {order.userId?.name || "Unknown User"}
                  </td>

                  <td style={tdStyle}>
                    ₹{Number(order.totalAmount || 0).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      style={selectStyle}
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "30px",
  background: "var(--card-bg)",
  borderRadius: "16px",
  border: "1px solid var(--border)",
  color: "var(--text)",
  boxShadow: "0 8px 30px var(--shadow)",
};

const titleStyle = {
  color: "var(--primary)",
  marginBottom: "25px",
  fontSize: "28px",
  fontWeight: "700",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  color: "var(--text)",
};

const rowStyle = {
  borderBottom: "1px solid var(--border)",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "var(--text-muted)",
  fontSize: "0.9rem",
  fontWeight: "600",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "15px",
  textAlign: "left",
  color: "var(--text)",
  whiteSpace: "nowrap",
};

const emptyStyle = {
  padding: "40px",
  textAlign: "center",
  color: "var(--text-muted)",
};

const selectStyle = {
  background: "var(--input-bg)",
  color: "var(--text)",
  padding: "8px 12px",
  border: "1px solid var(--border)",
  borderRadius: "7px",
  outline: "none",
  cursor: "pointer",
};

export default AdminOrders;