import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert('Please select an image');

    setLoading(true);

    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('https://shopsphere-p1l8.onrender.com/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        },
        body: data
      });

      const responseData = await res.json();

      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>

      <div style={containerStyle}>

        <h2 style={titleStyle}>
          Add New Product
        </h2>

        <form
          onSubmit={handleSubmit}
          style={formStyle}
        >

          <input
            type="text"
            placeholder="Product Name"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            required
            rows="4"
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
            }
            style={{
              ...inputStyle,
              resize: 'vertical'
            }}
          />

          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Category"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value
              })
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: e.target.value
              })
            }
            style={inputStyle}
          />

          <div style={uploadBoxStyle}>

            <label style={labelStyle}>
              Upload Product Image (Cloudinary)
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              style={fileInputStyle}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={buttonStyle}
          >
            {loading
              ? 'Uploading & Creating...'
              : 'Publish Product'}
          </button>

        </form>

      </div>

    </div>
  );
};


/* =========================
   THEME BASED STYLES
========================= */

const pageStyle = {
  width: '100%',
  minHeight: '80vh',
  padding: '40px 20px',
  background: 'var(--bg)',
  color: 'var(--text)',
  transition: 'all 0.3s ease'
};


const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',

  background: 'var(--card-bg)',

  padding: '40px',

  borderRadius: '18px',

  border: '1px solid var(--border)',

  boxShadow: '0 15px 40px var(--shadow)',

  transition: 'all 0.3s ease'
};


const titleStyle = {
  color: 'var(--primary)',

  marginBottom: '25px',

  fontSize: '28px',

  fontWeight: '700'
};


const formStyle = {
  display: 'flex',

  flexDirection: 'column',

  gap: '15px'
};


const inputStyle = {
  width: '100%',

  padding: '13px 14px',

  background: 'var(--input-bg)',

  border: '1px solid var(--border)',

  borderRadius: '9px',

  color: 'var(--text)',

  fontSize: '15px',

  outline: 'none',

  transition: 'all 0.3s ease'
};


const uploadBoxStyle = {
  padding: '18px',

  background: 'var(--input-bg)',

  border: '1px dashed var(--primary)',

  borderRadius: '10px',

  transition: 'all 0.3s ease'
};


const labelStyle = {
  display: 'block',

  marginBottom: '12px',

  color: 'var(--text-muted)',

  fontSize: '14px',

  fontWeight: '500'
};


const fileInputStyle = {
  width: '100%',

  color: 'var(--text)',

  background: 'transparent',

  fontSize: '14px'
};


const buttonStyle = {
  marginTop: '10px',

  width: '100%',

  padding: '14px',

  fontSize: '16px',

  borderRadius: '10px'
};


export default AddProduct;