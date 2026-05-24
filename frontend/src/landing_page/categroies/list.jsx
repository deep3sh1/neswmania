import React from "react";
import { useNavigate } from "react-router-dom";

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
      description: "International updates",
      icon: "fa-solid fa-globe",
      category: "world"
    },
    {
      title: "Technology",
      description: "Tech & AI news",
      icon: "fa-solid fa-microchip",
      category: "technology"
    },
    {
      title: "Finance",
      description: "Market & economy",
      icon: "fa-solid fa-arrow-trend-up",
      category: "finance"
    },
    {
      title: "Politics",
      description: "Political headlines",
      icon: "fa-solid fa-landmark",
      category: "politics"
    },
    {
      title: "Sports",
      description: "Sports & matches",
      icon: "fa-solid fa-trophy",
      category: "sports"
    },
    {
      title: "Entertainment",
      description: "Movies & celebrities",
      icon: "fa-solid fa-film",
      category: "entertainment"
    },
    {
      title: "Health",
      description: "Medical & wellness",
      icon: "fa-regular fa-heart",
      category: "health"
    },
    {
      title: "Science",
      description: "Research & discoveries",
      icon: "fa-solid fa-flask",
      category: "science"
    }
  ];

  return (

    <div className="container-fluid mt-5 ps-5 pe-5">

      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-5">

        <div>

          <h6 className="text-danger text-uppercase fw-bold">
            Categories
          </h6>

          <h1 className="fw-bold display-5">
            Explore Categories
          </h1>

        </div>

        <a
          href="/"
          className="text-decoration-none text-dark fw-semibold"
        >
          View all →
        </a>

      </div>

      {/* Categories Grid */}
      <div className="row g-4">

        {categories.map((item, index) => (

          <div
            className="col-lg-3 col-md-6"
            key={index}
          >

            <div
              onClick={() =>
                handleCategoryClick(item.category)
              }
              className="border rounded-4 p-4 d-flex align-items-center shadow-sm category-card"
              style={{
                cursor: "pointer",
                transition: "0.3s"
              }}
            >

              {/* ICON */}
              <div className="bg-light rounded-4 p-3 me-3">

                <i className={`${item.icon} fs-4`}></i>

              </div>

              {/* CONTENT */}
              <div>

                <h4 className="fw-bold mb-1">
                  {item.title}
                </h4>

                <p className="text-secondary mb-0">
                  {item.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* HOVER EFFECT */}
      <style>
        {`

          .category-card:hover {

            transform: translateY(-6px);

            box-shadow: 0 10px 25px rgba(0,0,0,0.12);

          }

        `}
      </style>

    </div>

  );
}

export default List;