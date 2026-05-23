import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(res.data);

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setMessage("Login successful");

      // REDIRECT
      window.location.href = "/";

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f5f3",
      }}
    >
      <div
        className="bg-white p-5 shadow-sm"
        style={{
          width: "420px",
          borderRadius: "24px",
          border: "1px solid #e5e5e5",
        }}
      >

        {/* Logo */}
        <div className="text-center mb-4">
          <h1
            className="fw-bold"
            style={{
              fontSize: "42px",
              color: "#111",
            }}
          >
            News<span style={{ color: "#e63946" }}>Verse</span>
          </h1>

          <p className="text-secondary mt-2">
            Welcome back to NewsVerse
          </p>
        </div>

        {/* MESSAGE */}
        {message && (
          <div className="alert alert-info">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              style={{
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "#f7f5f3",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              style={{
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "#f7f5f3",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-end mb-4">
            <a
              href="/forgot-password"
              className="text-decoration-none fw-semibold"
              style={{
                color: "#e63946",
                fontSize: "14px",
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{
              height: "50px",
              borderRadius: "14px",
              backgroundColor: "#e63946",
              color: "white",
              border: "none",
              fontSize: "17px",
            }}
          >
            Login
          </button>

        </form>

        {/* Signup */}
        <div className="text-center mt-4">
          <span className="text-secondary">
            Don’t have an account?
          </span>

          <a
            href="/signup"
            className="ms-2 text-decoration-none fw-semibold"
            style={{ color: "#e63946" }}
          >
            Sign Up
          </a>
        </div>

      </div>
    </div>
  );
}

export default Login;