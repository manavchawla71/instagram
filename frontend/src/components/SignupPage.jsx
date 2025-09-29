import React from "react";
import "./LoginPage.css";
const SignupPage = () => {
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
            type="email"
            placeholder="Email"
            className="login-input"
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            autoComplete="new-password"
            required
          />
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>
        <div className="login-divider">OR</div>

        <div className="login-signup">
          Have an account? <a href="/">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
