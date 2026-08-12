import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../styles/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      const data = res.data;

      console.log("REGISTER RESPONSE:", data);

      alert("Registration Successful!");

      login(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      // Admin hai to Admin Panel par bhejo
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      const message =
        error.response?.data?.message || "Registration failed";

      alert(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand"></div>
      </div>

      <div className="auth-right">
        <form
          className="auth-form premium-form"
          onSubmit={handleSubmit}
        >
          <div className="form-header">
            <span className="form-icon">✦</span>

            <h2>Create account</h2>

            <p>Join ShopSphere today</p>
          </div>

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Create Account
            <span>→</span>
          </button>

          <div className="auth-divider">
            <span>Already a member?</span>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;