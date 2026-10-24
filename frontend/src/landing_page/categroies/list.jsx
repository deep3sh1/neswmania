import React from "react";
import { useNavigate, Link } from "react-router-dom";

function List() {
  const navigate = useNavigate();

  // CATEGORY CLICK
  const handleCategoryClick = (category) => {
    navigate(`/?category=${category}`);
  };

  // CATEGORY DATA
  const categories = [
    {
      title: "World",
      description: "International headlines & global affairs",
      icon: "fa-solid fa-globe",
      category: "world",
      color: "#2563eb",
      bgColor: "#eff6ff"
    },
    {
      title: "Technology",
      description: "AI, gadgets, startups & innovations",
      icon: "fa-solid fa-microchip",
      category: "technology",
      color: "#7c3aed",
      bgColor: "#f5f3ff"
    },
    {
      title: "Finance",
      description: "Markets, crypto, economy & businesses",
      icon: "fa-solid fa-arrow-trend-up",
      category: "finance",
      color: "#059669",
      bgColor: "#ecfdf5"
    },
    {
      title: "Politics",
      description: "Governance, elections & policy debates",
      icon: "fa-solid fa-landmark",
      category: "politics",
      color: "#d97706",
      bgColor: "#fffbeb"
    },
    {
      title: "Sports",
      description: "Cricket, football, tennis & scores",
      icon: "fa-solid fa-trophy",
      category: "sports",
      color: "#dc2626",
      bgColor: "#fef2f2"
    },
    {
      title: "Entertainment",
      description: "Cinema, celebrity culture & music",
      icon: "fa-solid fa-film",
      category: "entertainment",
      color: "#db2777",
      bgColor: "#fdf2f8"
    },
    {
      title: "Health",
      description: "Wellness, medicine & public health",
      icon: "fa-solid fa-heart-pulse",
      category: "health",
      color: "#0891b2",
      bgColor: "#ecfeff"
    },
    {
      title: "Science",
      description: "Space, research, discoveries & physics",
      icon: "fa-solid fa-flask",
      category: "science",
      color: "#4f46e5",
      bgColor: "#eef2ff"
    }
  ];

  return (
    <div className="container-fluid mt-3 mt-md-5 mb-5 px-2 px-sm-3 px-md-4 px-lg-5">
      {/* Heading */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-4 mb-md-5">
        <div>
          <h6 className="text-danger text-uppercase fw-bold mb-1" style={{ fontSize: "12px", letterSpacing: "1px" }}>
            Categories
          </h6>
          <h1 className="fw-bold fs-2 fs-md-1 mb-0">
            Explore Categories
          </h1>
        </div>

        <Link
          to="/"
          className="text-decoration-none text-dark fw-semibold d-inline-flex align-items-center bg-light px-3 py-2 rounded-pill border small"
        >
          View all news
          <i className="fa-solid fa-arrow-right ms-2 text-danger small"></i>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="row g-3 g-md-4">
        {categories.map((item, index) => (
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex" key={index}>
            <div
              onClick={() => handleCategoryClick(item.category)}
              className="border rounded-4 p-3 p-md-4 d-flex align-items-center w-100 shadow-xs bg-white category-card"
              style={{
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {/* ICON */}
              <div
                className="rounded-4 p-3 me-3 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: item.bgColor,
                  color: item.color,
                }}
              >
                <i className={`${item.icon} fs-4`}></i>
              </div>

              {/* CONTENT */}
              <div className="overflow-hidden">
                <h5 className="fw-bold mb-1 text-dark text-truncate" style={{ fontSize: "17px" }}>
                  {item.title}
                </h5>
                <p className="text-secondary mb-0 small line-clamp-2" style={{ lineHeight: "1.3" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* HOVER EFFECT */}
      <style>{`
        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.12) !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
}

export default List;