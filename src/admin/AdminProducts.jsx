import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../services/api";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchProducts = async () => {
      try {
        const res = await API.get("/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = res.data;

        console.log("PRODUCTS RESPONSE:", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
        console.error("API ERROR:", error.response?.data);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user?.token) {
      alert("Please login again");
      return;
    }

    if (window.confirm("Are you strictly sure you want to delete this?")) {
      try {
        await API.delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setProducts((prev) =>
          prev.filter((p) => p._id !== id)
        );
      } catch (error) {
        console.error("Delete error:", error);

        const data = error.response?.data;
        alert(data?.message || "Delete failed");
      }
    }
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}

      <div style={headerStyle}>
        <h2 style={titleStyle}>Manage Products</h2>

        <Link to="/admin/add-product" style={addBtn}>
          + Add Product
        </Link>
      </div>

      {/* TABLE */}

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>PRICE</th>
              <th style={thStyle}>CATEGORY</th>
              <th style={thStyle}>STOCK</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "var(--text-muted)",
                  }}
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} style={rowStyle}>
                  <td style={tdStyle}>
                    {product._id
                      ? `${product._id.substring(0, 8)}...`
                      : "-"}
                  </td>

                  <td style={tdStyle}>
                    <strong style={{ color: "var(--text)" }}>
                      {product.name}
                    </strong>
                  </td>

                  <td style={priceStyle}>
                    ₹{Number(product.price || 0).toFixed(2)}
                  </td>

                  <td style={tdStyle}>
                    <span style={categoryStyle}>
                      {product.category}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        color:
                          product.stock > 0
                            ? "var(--success)"
                            : "var(--danger)",
                        fontWeight: "600",
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td style={tdStyle}>
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                      style={editBtn}
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
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

/* =====================================================
   CONTAINER
===================================================== */

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

/* =====================================================
   HEADER
===================================================== */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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

const addBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "11px 18px",
  background:
    "linear-gradient(135deg, var(--primary), var(--primary-dark))",
  color: "#fff",
  borderRadius: "10px",
  fontWeight: "600",
  fontSize: "14px",
  textDecoration: "none",
  boxShadow: "0 6px 18px rgba(249, 115, 22, 0.22)",
  transition: "all 0.3s ease",
};

/* =====================================================
   TABLE
===================================================== */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "750px",
};

const rowStyle = {
  borderBottom: "1px solid var(--border)",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  color: "var(--text-muted)",
  fontSize: "0.85rem",
  fontWeight: "600",
  letterSpacing: "0.5px",
  background: "var(--input-bg)",
};

const tdStyle = {
  padding: "16px 15px",
  textAlign: "left",
  color: "var(--text-muted)",
  transition: "color 0.3s ease",
};

const priceStyle = {
  padding: "16px 15px",
  color: "var(--primary)",
  fontWeight: "700",
};

/* =====================================================
   CATEGORY
===================================================== */

const categoryStyle = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "20px",
  background: "var(--input-bg)",
  color: "var(--text-muted)",
  border: "1px solid var(--border)",
  fontSize: "13px",
};

/* =====================================================
   EDIT BUTTON
===================================================== */

const editBtn = {
  display: "inline-block",
  background: "#3b82f6",
  color: "#fff",
  padding: "7px 13px",
  borderRadius: "7px",
  marginRight: "8px",
  textDecoration: "none",
  fontSize: "13px",
  fontWeight: "600",
  transition: "all 0.2s ease",
};

/* =====================================================
   DELETE BUTTON
===================================================== */

const deleteBtn = {
  background: "#ef4444",
  color: "#fff",
  padding: "7px 13px",
  borderRadius: "7px",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
  transition: "all 0.2s ease",
};

export default AdminProducts;