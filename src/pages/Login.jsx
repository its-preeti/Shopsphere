import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
          email,
         password,
});
      const data = res.data;

      console.log("LOGIN RESPONSE:", data);

      // AuthContext me user save karo
      login(data);

      // LocalStorage me bhi save karo
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Admin ko Admin Panel par bhejo
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const message =
        error.response?.data?.message || "Login failed";

      alert(message);
    } finally {
      setLoading(false);
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
          onSubmit={handleLogin}
        >
          <div className="form-heading">
            <p>YOUR ACCOUNT</p>
          </div>

          <div className="input-group">
            <label>Email address</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="password-label">
              <label>Password</label>
              <a href="#forgot">Forgot password?</a>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <span>→</span>}
          </button>

          <Link to="/register" className="create-account">
            Create an account
            <span>↗</span>
          </Link>
        </form>

        <p className="auth-footer">
          By continuing, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;