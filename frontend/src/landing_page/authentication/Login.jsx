import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  // HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${apiUrl}/api/auth/login`, formData);

      // SAVE TOKEN & USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("Login successful! Redirecting...");
      setIsError(false);

      setTimeout(() => {
        window.location.href = "/";
      }, 600);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage(
        error.response?.data?.message || "Login failed. Please check your credentials."
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
            Welcome back! Please enter your details.
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
              placeholder="Enter your password"
              required
              style={{
                height: "48px",
                backgroundColor: "#fbfbfb",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {/* FORGOT PASSWORD */}
          <div className="d-flex justify-content-end mb-4">
            <span
              onClick={() => alert("Please contact admin or reset password feature coming soon.")}
              className="text-decoration-none fw-semibold small"
              style={{
                color: "#e63946",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </span>
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <div className="text-center mt-4 pt-2 border-top">
          <span className="text-secondary small">
            Don’t have an account?
          </span>
          <Link
            to="/signup"
            className="ms-2 text-decoration-none fw-semibold small"
            style={{ color: "#e63946" }}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;