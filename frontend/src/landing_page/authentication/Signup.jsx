import React, { useState } from "react";
import axios from "axios";

function Signup() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD CHECK
    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(res.data);

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setMessage("Signup successful");

      // REDIRECT
      window.location.href = "/";

    } catch (error) {

      console.log(error);

      setMessage(
        error.response?.data?.message || "Signup failed"
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
            Create your account to continue
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

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your name"
              style={{
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "#f7f5f3",
                border: "1px solid #ddd",
              }}
            />
          </div>

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
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Create password"
              style={{
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "#f7f5f3",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirm password"
              style={{
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "#f7f5f3",
                border: "1px solid #ddd",
              }}
            />
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
            Create Account
          </button>

        </form>

        {/* Login */}
        <div className="text-center mt-4">
          <span className="text-secondary">
            Already have an account?
          </span>

          <a
            href="/login"
            className="ms-2 text-decoration-none fw-semibold"
            style={{ color: "#e63946" }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;