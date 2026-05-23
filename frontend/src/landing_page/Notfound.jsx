import React from "react";

function Notfound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        404
      </h1>

      <h2 className="mb-3">Oops! Page Not Found</h2>

      <p
        style={{
          maxWidth: "500px",
          color: "#cbd5e1",
          fontSize: "18px",
        }}
      >
        The page you are looking for might have been removed,
        renamed, or is temporarily unavailable.
      </p>

      <a
        href="/"
        className="btn btn-primary mt-4 px-4 py-2"
        style={{
          borderRadius: "10px",
          fontWeight: "600",
        }}
      >
        Go Back Home
      </a>
    </div>
  );
}

export default Notfound;