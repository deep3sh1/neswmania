import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  // USER
  const user = JSON.parse(localStorage.getItem("user"));

  // SEARCH
  const [search, setSearch] = useState("");

  // NEWS
  const [allNews, setAllNews] = useState([]);

  // FILTERED NEWS
  const [filteredNews, setFilteredNews] = useState([]);

  // FETCH NEWS
  useEffect(() => {

    const fetchNews = async () => {

      try {

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news`
        );

        const data = await res.json();

        setAllNews(Array.isArray(data) ? data : []);

      } catch (error) {

        console.log(error);

      }

    };

    fetchNews();

  }, []);

  // SEARCH FUNCTION
  const handleSearch = (e) => {

    const value = e.target.value;

    setSearch(value);

    // EMPTY SEARCH
    if (value.trim() === "") {

      setFilteredNews([]);
      return;

    }

    const keyword = value.toLowerCase();

    const filtered = allNews.filter((news) => {

      const title =
        String(news.title || "").toLowerCase();

      const description =
        String(news.description || "").toLowerCase();

      const source =
        String(news.source?.name || "").toLowerCase();

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

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg bg-white border-bottom py-3 px-3">

      <div className="container-fluid">

        {/* LOGO */}
        <Link
          className="navbar-brand fw-bold fs-3 text-decoration-none"
          to="/"
        >
          News<span className="text-danger">Verse</span>
        </Link>

        {/* TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVBAR CONTENT */}
        <div
          className="collapse navbar-collapse align-items-center"
          id="navbarNav"
        >

          {/* LINKS */}
          <ul className="navbar-nav ms-3">

            <li className="nav-item">

              <Link
                className="nav-link fw-semibold text-dark"
                to="/"
              >
                Home
              </Link>

            </li>

            <li className="nav-item ms-lg-3">

              <Link
                className="nav-link fw-semibold text-secondary"
                to="/categories"
              >
                Categories
              </Link>

            </li>

          </ul>

          {/* CREATE NOTES BUTTON */}
          <div className="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0">

            {user ? (

              <Link
                to="/notes"
                className="btn fw-semibold me-3"
                style={{
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "#080001",
                  color: "white",
                  border: "none",
                  fontSize: "17px",
                  paddingTop: "10px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#080001";
                }}
              >
                Create Notes
              </Link>

            ) : (

              <button
                className="btn fw-semibold me-3"
                style={{
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "#080001",
                  color: "white",
                  border: "none",
                  fontSize: "17px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#080001";
                }}
                onClick={() => {

                  alert("Please login first to create notes");

                  navigate("/login");

                }}
              >
                Create Notes
              </button>

            )}

          </div>

          {/* SEARCH */}
          <div
            className="position-relative ms-lg-auto mt-3 mt-lg-0"
            style={{
              width: "350px",
              maxWidth: "100%",
            }}
          >

            <input
              className="form-control rounded-pill px-4 py-2"
              type="search"
              placeholder="Search news, topics, newspapers..."
              value={search}
              onChange={handleSearch}
            />

            {/* SEARCH RESULTS */}
            {search.trim() !== "" && (

              <div
                className="bg-white shadow position-absolute w-100 mt-2"
                style={{
                  zIndex: 1000,
                  borderRadius: "14px",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >

                {filteredNews.length > 0 ? (

                  filteredNews.slice(0, 6).map((news, index) => (

                    <a
                      key={index}
                      href={news.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none text-dark"
                    >

                      <div
                        className="p-3 border-bottom"
                        style={{
                          cursor: "pointer",
                          transition: "0.3s"
                        }}
                      >

                        <h6 className="fw-bold mb-1">
                          {news.title}
                        </h6>

                        <small className="text-danger">
                          {news.source?.name || "News Source"}
                        </small>

                      </div>

                    </a>

                  ))

                ) : (

                  <div className="p-4 text-center">

                    <h6 className="fw-bold mb-1 text-secondary">
                      Sorry, no news available
                    </h6>

                    <small className="text-muted">
                      Try another topic
                    </small>

                  </div>

                )}

              </div>

            )}

          </div>

          {/* USER */}
          {user ? (

            <div className="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0">

              {/* USERNAME */}
              <span
                className="fw-semibold me-3"
                style={{
                  color: "#111",
                  fontSize: "16px",
                }}
              >
                Hello, {user.username}
              </span>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="btn fw-semibold"
                style={{
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "#e63946",
                  color: "white",
                  border: "none",
                  fontSize: "17px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#c1121f";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#e63946";
                }}
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="d-flex ms-lg-4 mt-3 mt-lg-0">

              {/* SIGNUP */}
              <Link
                to="/signup"
                className="btn fw-semibold"
                style={{
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "#e63946",
                  color: "white",
                  border: "none",
                  fontSize: "17px",
                  paddingTop: "11px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#c1121f";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#e63946";
                }}
              >
                Create Account
              </Link>

              {/* LOGIN */}
              <div className="ps-3">

                <Link
                  to="/login"
                  className="btn fw-semibold"
                  style={{
                    height: "50px",
                    borderRadius: "14px",
                    backgroundColor: "#080001",
                    color: "white",
                    border: "none",
                    fontSize: "17px",
                    textAlign: "center",
                    paddingTop: "10px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#222";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#080001";
                  }}
                >
                  Login
                </Link>

              </div>

            </div>

          )}

        </div>

      </div>

    </nav>

  );
}

export default Navbar;