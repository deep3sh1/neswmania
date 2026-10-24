import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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
      setIsError(true);
      return setMessage("Passwords do not match");
    }

    if (formData.password.length < 6) {
      setIsError(true);
      return setMessage("Password must be at least 6 characters long");
    }

    setLoading(true);
    setMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/auth/signup`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // SAVE TOKEN & USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Account created successfully! Redirecting...");
      setIsError(false);

      setTimeout(() => {
        window.location.href = "/";
      }, 600);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center px-3 py-4 py-md-5"
      style={{
        minHeight: "85vh",
        backgroundColor: "#f7f5f3",
      }}
    >
      <div
        className="bg-white p-3 p-sm-4 p-md-5 shadow-sm w-100"
        style={{
          maxWidth: "440px",
          borderRadius: "24px",
          border: "1px solid #e5e5e5",
        }}
      >
        {/* LOGO */}
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none">
            <h1
              className="fw-bold mb-1"
              style={{
                fontSize: "36px",
                color: "#111",
              }}
            >
              News<span style={{ color: "#e63946" }}>Verse</span>
            </h1>
          </Link>

          <p className="text-secondary small mt-1 mb-0">
            Create your account to start curating news
          </p>
        </div>

        {/* FEEDBACK ALERT */}
        {message && (
          <div
            className={`alert ${isError ? "alert-danger" : "alert-success"} rounded-3 py-2 px-3 small`}
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* USERNAME */}
          <div className="mb-3">
            <label className="form-label fw-semibold small mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="e.g. Alex Johnson"
              required
              style={{
                height: "48px",
                backgroundColor: "#fbfbfb",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-semibold small mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="name@example.com"
              required
              style={{
                height: "48px",
                backgroundColor: "#fbfbfb",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label fw-semibold small mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="At least 6 characters"
              required
              style={{
                height: "48px",
                backgroundColor: "#fbfbfb",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="form-label fw-semibold small mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control rounded-3"
              placeholder="Re-enter password"
              required
              style={{
                height: "48px",
                backgroundColor: "#fbfbfb",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="btn w-100 fw-semibold rounded-3 btn-touch"
            style={{
              backgroundColor: "#e63946",
              color: "white",
              border: "none",
              fontSize: "16px",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="text-center mt-4 pt-2 border-top">
          <span className="text-secondary small">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="ms-2 text-decoration-none fw-semibold small"
            style={{ color: "#e63946" }}
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;