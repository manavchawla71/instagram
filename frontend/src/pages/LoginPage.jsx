import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!form.username || !form.password) {
        throw new Error("All fields are required");
      }
      const res = await axios.post("http://localhost:3000/login", form);
      window.localStorage.setItem("username", form.username);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Instagram</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="login-input"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        {error && (
          <div style={{ color: "#d32f2f", marginTop: 10 }}>{error}</div>
        )}
        <div className="login-divider">OR</div>
        <div className="login-signup">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
