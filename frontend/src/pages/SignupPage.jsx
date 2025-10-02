import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post("http://localhost:3000/signup", form);
      setSuccess(res.data.message || "Signup successful!");
      setForm({ username: "", email: "", password: "" });
      setTimeout(() => {
        localStorage.setItem("username", form.username);
        navigate("/dashboard", { state: { username: form.username } });
      }, 1000); // short delay to show success message
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
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
            type="email"
            name="email"
            placeholder="Email"
            className="login-input"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="login-input"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {error && (
          <div style={{ color: "#d32f2f", marginTop: 10 }}>{error}</div>
        )}
        {success && (
          <div style={{ color: "#388e3c", marginTop: 10 }}>{success}</div>
        )}
        <div className="login-divider">OR</div>
        <a href="#" className="login-fb">
          Sign up with Facebook
        </a>
        <div className="login-signup">
          Have an account? <a href="/">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
