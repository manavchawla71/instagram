import React from "react";
import "./LoginPage.css";
const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Instagram</h2>
        <form className="login-form">
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            autoComplete="current-password"
            required
          />
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <div className="login-divider">OR</div>

        <div className="login-signup">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
