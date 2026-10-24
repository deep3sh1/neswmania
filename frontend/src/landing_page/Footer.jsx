import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-auto pt-5 pb-4 border-top border-dark-subtle">
      <div className="container-fluid px-3 px-sm-4 px-lg-5" style={{ maxWidth: "1280px" }}>
        <div className="row g-4 mb-4">
          {/* Logo & About */}
          <div className="col-12 col-md-4 mb-2 mb-md-0">
            <Link to="/" className="text-decoration-none">
              <h3 className="fw-bold mb-2">
                <span className="text-white">News</span>
                <span className="text-danger">Verse</span>
              </h3>
            </Link>

            <p className="text-secondary small pe-lg-4" style={{ lineHeight: "1.6" }}>
              Your curated destination for real-time breaking news, verified reporting, global developments, technology insights, and business analysis.
            </p>

            <div className="d-flex gap-3 text-secondary fs-5 mt-3">
              <a href="#" className="text-secondary text-decoration-none hover-white" aria-label="Twitter">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="text-secondary text-decoration-none hover-white" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-secondary text-decoration-none hover-white" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-secondary text-decoration-none hover-white" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-sm-6 col-md-4">
            <h6 className="fw-bold text-white text-uppercase mb-3 small" style={{ letterSpacing: "1px" }}>
              Quick Links
            </h6>

            <ul className="list-unstyled small mb-0">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-secondary hover-white">
                  Home Feed
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/categories" className="text-decoration-none text-secondary hover-white">
                  Explore Categories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/notes" className="text-decoration-none text-secondary hover-white">
                  Personal Notes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-secondary hover-white">
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-6 col-sm-6 col-md-4">
            <h6 className="fw-bold text-white text-uppercase mb-3 small" style={{ letterSpacing: "1px" }}>
              Top Categories
            </h6>

            <ul className="list-unstyled text-secondary small mb-0">
              <li className="mb-2">
                <Link to="/?category=technology" className="text-decoration-none text-secondary hover-white">
                  Technology & AI
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=finance" className="text-decoration-none text-secondary hover-white">
                  Finance & Markets
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=politics" className="text-decoration-none text-secondary hover-white">
                  Politics & World
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/?category=sports" className="text-decoration-none text-secondary hover-white">
                  Sports & Athletics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-secondary small">
          <p className="mb-0 text-center text-sm-start">
            © {currentYear} NewsVerse. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <a href="#" className="text-secondary text-decoration-none hover-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="text-secondary text-decoration-none hover-white">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .hover-white:hover {
          color: #ffffff !important;
          transition: color 0.2s ease;
        }
      `}</style>
    </footer>
  );
}

export default Footer;