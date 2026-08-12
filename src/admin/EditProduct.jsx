import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      setLoading(false);

      if (res.ok) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      } else {
        alert(responseData.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Update product error:", error);
      setLoading(false);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Edit Product</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          required
          rows="4"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          required
          value={formData.price}
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          required
          value={formData.stock}
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* Image */}
        <div style={imageBoxStyle}>
          <label style={labelStyle}>
            Replace Image (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={fileInputStyle}
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn"
          style={{
            marginTop: "10px",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

/* =====================================================
   THEME BASED STYLES
   ===================================================== */

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "40px",

  background: "var(--card-bg)",

  borderRadius: "16px",

  border: "1px solid var(--border)",

  color: "var(--text)",

  boxShadow: "0 10px 35px var(--shadow)",

  transition:
    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
};

const titleStyle = {
  color: "var(--primary)",
  marginBottom: "20px",
  fontSize: "28px",
  fontWeight: "700",
};

const inputStyle = {
  width: "100%",

  padding: "13px 14px",

  background: "var(--input-bg)",

  border: "1px solid var(--border)",

  borderRadius: "8px",

  color: "var(--text)",

  fontSize: "15px",

  outline: "none",

  transition:
    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",

  fontFamily: "inherit",
};

const imageBoxStyle = {
  padding: "15px",

  border: "1px dashed var(--primary)",

  borderRadius: "8px",

  background: "var(--input-bg)",

  transition:
    "background-color 0.3s ease, border-color 0.3s ease",
};

const labelStyle = {
  display: "block",

  marginBottom: "10px",

  color: "var(--text-muted)",

  fontSize: "14px",

  fontWeight: "500",
};

const fileInputStyle = {
  width: "100%",

  color: "var(--text)",

  fontSize: "14px",

  background: "transparent",

  cursor: "pointer",
};

export default EditProduct;