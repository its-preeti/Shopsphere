import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        console.log("Users API Status:", res.status);
        console.log("Users API Data:", data);

        if (!res.ok) {
          console.error("Users API Error:", data.message);
          setUsers([]);
          return;
        }

        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>User Directory</h2>

          <p style={subtitleStyle}>
            Manage and view registered ShopSphere users
          </p>
        </div>

        <div style={userCountStyle}>
          {users.length} Users
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>EMAIL</th>
              <th style={thStyle}>ROLE</th>
              <th style={thStyle}>JOINED</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "45px 20px",
                    color: "var(--text-muted)",
                  }}
                >
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "45px 20px",
                    color: "var(--text-muted)",
                  }}
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} style={rowStyle}>
                  <td style={tdStyle}>
                    <span style={idStyle}>
                      {u._id ? `${u._id.substring(0, 8)}...` : "-"}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <strong
                      style={{
                        color: "var(--text)",
                        fontWeight: "600",
                      }}
                    >
                      {u.name || "-"}
                    </strong>
                  </td>

                  <td style={tdStyle}>
                    <span style={{ color: "var(--text-muted)" }}>
                      {u.email || "-"}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        ...roleStyle,
                        background:
                          u.role === "admin"
                            ? "rgba(234, 88, 12, 0.14)"
                            : "rgba(16, 185, 129, 0.14)",
                        color:
                          u.role === "admin"
                            ? "var(--primary)"
                            : "var(--success)",
                        border:
                          u.role === "admin"
                            ? "1px solid rgba(234, 88, 12, 0.25)"
                            : "1px solid rgba(16, 185, 129, 0.25)",
                      }}
                    >
                      {u.role ? u.role.toUpperCase() : "USER"}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
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
  width: "100%",
  maxWidth: "1200px",
  margin: "40px auto",
  padding: "30px",
  background: "var(--card-bg)",
  border: "1px solid var(--border)",
  borderRadius: "18px",
  color: "var(--text)",
  boxShadow: "0 10px 35px var(--shadow)",
  transition:
    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "25px",
  flexWrap: "wrap",
};

const titleStyle = {
  margin: 0,
  color: "var(--text)",
  fontSize: "28px",
  fontWeight: "700",
};

const subtitleStyle = {
  margin: "6px 0 0",
  color: "var(--text-muted)",
  fontSize: "14px",
};

const userCountStyle = {
  padding: "9px 15px",
  borderRadius: "20px",
  background: "var(--input-bg)",
  border: "1px solid var(--border)",
  color: "var(--primary)",
  fontSize: "14px",
  fontWeight: "600",
};

const tableStyle = {
  width: "100%",
  minWidth: "700px",
  borderCollapse: "collapse",
};

const rowStyle = {
  borderBottom: "1px solid var(--border)",
  transition: "background-color 0.2s ease",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "var(--text-muted)",
  background: "var(--input-bg)",
  fontSize: "0.85rem",
  fontWeight: "600",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "16px 15px",
  textAlign: "left",
  color: "var(--text-muted)",
  fontSize: "14px",
};

const idStyle = {
  fontFamily: "monospace",
  fontSize: "13px",
  color: "var(--text-muted)",
};

const roleStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.3px",
};

export default AdminUsers;