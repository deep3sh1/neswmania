import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center px-3 py-5"
      style={{
        minHeight: "75vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(4rem, 15vw, 8rem)",
          fontWeight: "800",
          letterSpacing: "-2px",
          color: "#e63946",
          lineHeight: "1",
          marginBottom: "16px",
        }}
      >
        404
      </h1>

      <h2 className="mb-2 fw-bold fs-3 fs-md-2">Page Not Found</h2>

      <p
        className="px-2"
        style={{
          maxWidth: "480px",
          color: "#94a3b8",
          fontSize: "16px",
          lineHeight: "1.5",
        }}
      >
        The headline or page you are looking for might have been moved, archived, or is currently unavailable.
      </p>

      <Link
        to="/"
        className="btn btn-danger mt-3 px-4 py-2 rounded-3 fw-semibold btn-touch"
      >
        <i className="fa-solid fa-house me-2"></i>
        Back to Home Feed
      </Link>
    </div>
  );
}

export default Notfound;