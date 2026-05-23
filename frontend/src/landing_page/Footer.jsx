import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-5 pb-3">
      
      <div className="container">
        <div className="row">

          {/* Logo & About */}
          <div className="col-md-4 mb-4">
            <h3 className="fw-bold text-warning">NewsMania</h3>

            <p className="text-secondary">
              Stay updated with the latest breaking news, technology,
              sports, entertainment, business, and world headlines
              every day.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>

            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-secondary">
                  Home
                </a>
              </li>

              <li className="mb-2">
                <a href="/categories" className="text-decoration-none text-secondary">
                  Categories
                </a>
              </li>

              <li className="mb-2">
                <a href="/about" className="text-decoration-none text-secondary">
                  About
                </a>
              </li>

              <li className="mb-2">
                <a href="/contact" className="text-decoration-none text-secondary">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Top Categories</h5>

            <ul className="list-unstyled text-secondary">
              <li className="mb-2">Technology</li>
              <li className="mb-2">Sports</li>
              <li className="mb-2">Politics</li>
              <li className="mb-2">Business</li>
              <li className="mb-2">Entertainment</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <hr className="border-secondary" />

        <div className="text-center text-secondary">
          <p className="mb-0">
            © 2026 NewsMania. All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;