import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const navCollapseRef = useRef(null);

  // USER
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // MOBILE NAV TOGGLE STATE
  const [navOpen, setNavOpen] = useState(false);

  // SEARCH
  const [search, setSearch] = useState("");
  const [allNews, setAllNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);

  // Close mobile nav on route change
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  // FETCH NEWS FOR LIVE SEARCH
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/news`);
        const data = await res.json();
        setAllNews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Navbar news fetch error:", error);
      }
    };

    fetchNews();
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredNews([]);
      return;
    }

    const keyword = value.toLowerCase();
    const filtered = allNews.filter((news) => {
      const title = String(news.title || "").toLowerCase();
      const description = String(news.description || "").toLowerCase();
      const source = String(news.source?.name || "").toLowerCase();

      return (
        title.includes(keyword) ||
        description.includes(keyword) ||
        source.includes(keyword)
      );
    });

    setFilteredNews(filtered);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setNavOpen(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom py-2 py-md-3 px-2 px-sm-3 px-md-4 sticky-top shadow-xs">
      <div className="container-fluid">
        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold fs-3 text-decoration-none d-flex align-items-center"
          to="/"
          onClick={() => setNavOpen(false)}
        >
          <span className="text-dark">News</span>
          <span className="text-danger">Verse</span>
        </Link>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="navbar-toggler border-0 shadow-none p-2"
          type="button"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavOpen(!navOpen)}
        >
          <i className={`fa-solid ${navOpen ? "fa-xmark" : "fa-bars"} fs-4 text-dark`}></i>
        </button>

        {/* NAVBAR CONTENT */}
        <div
          ref={navCollapseRef}
          className={`collapse navbar-collapse ${navOpen ? "show" : ""} mt-3 mt-lg-0`}
          id="navbarNav"
        >
          {/* NAVIGATION LINKS */}
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold px-2 px-lg-3 py-2 ${
                  location.pathname === "/" ? "text-danger" : "text-dark"
                }`}
                to="/"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold px-2 px-lg-3 py-2 ${
                  location.pathname === "/categories" ? "text-danger" : "text-secondary"
                }`}
                to="/categories"
                onClick={() => setNavOpen(false)}
              >
                Categories
              </Link>
            </li>
          </ul>

          {/* CREATE NOTES BUTTON */}
          <div className="d-flex align-items-center my-2 my-lg-0 ms-lg-3">
            {user ? (
              <Link
                to="/notes"
                onClick={() => setNavOpen(false)}
                className="btn fw-semibold w-100 w-lg-auto btn-touch px-4"
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#080001",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                  transition: "0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#080001";
                }}
              >
                <i className="fa-regular fa-note-sticky me-2"></i>
                Create Notes
              </Link>
            ) : (
              <button
                className="btn fw-semibold w-100 w-lg-auto btn-touch px-4"
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#080001",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                  transition: "0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#080001";
                }}
                onClick={() => {
                  setNavOpen(false);
                  alert("Please login first to create notes");
                  navigate("/login");
                }}
              >
                <i className="fa-regular fa-note-sticky me-2"></i>
                Create Notes
              </button>
            )}
          </div>

          {/* SEARCH INPUT */}
          <div
            className="position-relative my-2 my-lg-0 ms-lg-auto w-100"
            style={{
              maxWidth: "360px",
            }}
          >
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-3">
                <i className="fa-solid fa-magnifying-glass text-muted"></i>
              </span>
              <input
                className="form-control bg-light border-start-0 rounded-end-pill py-2 pe-3 shadow-none"
                type="search"
                placeholder="Search news, topics..."
                value={search}
                onChange={handleSearch}
              />
            </div>

            {/* LIVE SEARCH RESULTS OVERLAY */}
            {search.trim() !== "" && (
              <div
                className="bg-white shadow-lg position-absolute w-100 mt-2 border"
                style={{
                  zIndex: 1060,
                  borderRadius: "16px",
                  maxHeight: "360px",
                  overflowY: "auto",
                  top: "100%",
                  left: 0,
                }}
              >
                {filteredNews.length > 0 ? (
                  filteredNews.slice(0, 6).map((news, index) => (
                    <a
                      key={index}
                      href={news.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none text-dark d-block"
                      onClick={() => setSearch("")}
                    >
                      <div
                        className="p-3 border-bottom hover-bg-light"
                        style={{
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      >
                        <h6 className="fw-bold mb-1 line-clamp-2" style={{ fontSize: "14px" }}>
                          {news.title}
                        </h6>
                        <small className="text-danger fw-semibold">
                          {news.source?.name || "News Source"}
                        </small>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="p-3 text-center">
                    <h6 className="fw-bold mb-1 text-secondary" style={{ fontSize: "14px" }}>
                      No results for "{search}"
                    </h6>
                    <small className="text-muted">Try another keyword</small>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* USER ACTIONS */}
          {user ? (
            <div className="d-flex flex-column flex-sm-row align-items-sm-center my-2 my-lg-0 ms-lg-3 gap-2">
              <span
                className="fw-semibold text-truncate"
                style={{
                  color: "#111",
                  fontSize: "15px",
                }}
              >
                Hello, {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="btn fw-semibold btn-touch px-4"
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#e63946",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                  transition: "0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c1121f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#e63946";
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column flex-sm-row my-2 my-lg-0 ms-lg-3 gap-2">
              {/* SIGNUP */}
              <Link
                to="/signup"
                onClick={() => setNavOpen(false)}
                className="btn fw-semibold btn-touch px-3 text-center"
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#e63946",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                  transition: "0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c1121f";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#e63946";
                }}
              >
                Create Account
              </Link>

              {/* LOGIN */}
              <Link
                to="/login"
                onClick={() => setNavOpen(false)}
                className="btn fw-semibold btn-touch px-4 text-center"
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#080001",
                  color: "white",
                  border: "none",
                  fontSize: "15px",
                  transition: "0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#080001";
                }}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;