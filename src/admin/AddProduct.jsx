import React, { useState,useContext,useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /*ADMIN PROTECTION */

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
if (!user || user.role !== "admin") {
    return null;
  }

  /*INPUT HANDLER*/

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /*IMAGE HANDLER*/

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  /* SUBMIT PRODUCT*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select a product image");
      return;
    }
 try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("image", image);

      const res = await API.post("/products", data, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
       console.log("PRODUCT RESPONSE:", res.data);
       alert("Product created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
      });
     setImage(null);
      navigate("/shop");
      } catch (error) {
      console.error("ADD PRODUCT ERROR:", error);
      const message =
        error.response?.data?.message ||
        "Error creating product";
         alert(message);
        } finally {
      setLoading(false);
    }
  };
return (
    <div style={pageStyle}>
      <div style={containerStyle}>
      <h2 style={titleStyle}>Add New Product</h2>
      <p style={subtitleStyle}>Add a new product to your ShopSphere store.</p>
        <form onSubmit={handleSubmit}style={formStyle} >

   {/* PRODUCT NAME */}

     <div style={fieldStyle}> <label style={labelStyle}> Product Name </label>
      <input type="text" name="name"placeholder="Enter product name"value={formData.name}onChange={handleChange} requiredstyle={inputStyle}  />
          </div>

          {/* DESCRIPTION */}

      <div style={fieldStyle}> <label style={labelStyle}> Description</label>
         <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              style={{
                ...inputStyle,
                resize: "vertical"
              }}
            />
          </div>

          {/* PRICE */}

          <div style={fieldStyle}><label style={labelStyle}> Price </label>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
            />
          </div>

          {/* CATEGORY */}

          <div style={fieldStyle}><label style={labelStyle}>Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Electronics, Fashion"
              value={formData.category}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* STOCK */}

          <div style={fieldStyle}><label style={labelStyle}>Stock Quantity </label>
           <input
              type="number"
              name="stock"
              placeholder="Enter stock quantity"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              style={inputStyle}
            />
          </div>

          {/* IMAGE */}

          <div style={uploadBoxStyle}>
            <label style={labelStyle}>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              style={fileInputStyle}
            />
           {image && (<p style={fileNameStyle}>Selected: {image.name} </p> )}
            </div>

          {/* SUBMIT */}
         <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              ...buttonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer"
            }}
          >
            {loading
              ? "Uploading & Creating..."
              : "Publish Product"}

            {!loading && (
              <span style={{ marginLeft: "8px" }}>
                →
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
/*STYLES*/

const pageStyle = {
  width: "100%",
  minHeight: "80vh",
  padding: "40px 20px",
  background: "var(--bg)",
  color: "var(--text)",
  transition: "all 0.3s ease"
};
const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  background: "var(--card-bg)",
  padding: "40px",
  borderRadius: "18px",
  border: "1px solid var(--border)",
  boxShadow: "0 15px 40px var(--shadow)",
  transition: "all 0.3s ease"
};

const titleStyle = {
  margin: "0 0 8px",
  color: "var(--primary)",
  fontSize: "28px",
  fontWeight: "700"
};

const subtitleStyle = {
  margin: "0 0 28px",
  color: "var(--text-muted)",
  fontSize: "14px"
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px"
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "7px"
};

const labelStyle = {
  color: "var(--text)",
  fontSize: "14px",
  fontWeight: "600"
};

const inputStyle = {
  width: "100%",
  padding: "13px 14px",
  background: "var(--input-bg)",
  border: "1px solid var(--border)",
  borderRadius: "9px",
  color: "var(--text)",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "all 0.3s ease"
};

const uploadBoxStyle = {
  padding: "18px",
  background: "var(--input-bg)",
  border: "1px dashed var(--primary)",
  borderRadius: "10px",
  transition: "all 0.3s ease"
};

const fileInputStyle = {
  width: "100%",
  color: "var(--text)",
  background: "transparent",
  fontSize: "14px"
};

const fileNameStyle = {
  margin: "10px 0 0",
  color: "var(--text-muted)",
  fontSize: "13px",
  wordBreak: "break-word"
};

const buttonStyle = {
  marginTop: "5px",
  width: "100%",
  padding: "14px",
  fontSize: "16px",
  fontWeight: "600",
  borderRadius: "10px",
  border: "none"
};

export default AddProduct;