import React, { useEffect, useState } from "react";
import axios from "axios";

function ExploreSection() {

  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchNews = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/news`
        );

        console.log(response.data);

        setNewsData(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchNews();

  }, []);

  return (

    <div className="container-fluid mt-5 ps-5 pe-5">

      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-lg-2">

          <h6 className="text-uppercase fw-bold text-secondary mb-4">
            Newspapers
          </h6>

          <div className="d-flex flex-column gap-3">

            {[
              "The Hindu",
              "Times of India",
              "Indian Express",
              "Hindustan Times",
              "Lokmat",
              "Sakal",
              "Dainik Bhaskar",
              "Economic Times"
            ].map((paper, index) => (

              <div
                key={index}
                className="d-flex align-items-center p-3 rounded-4 border newspaper-item"
                style={{
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              >

                <i className="fa-regular fa-newspaper me-3 text-secondary"></i>

                <span className="fs-6 fw-semibold text-secondary">
                  {paper}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-10">

          <div className="d-flex align-items-center mb-5">

            <i className="fa-solid fa-fire text-danger fs-3 me-3"></i>

            <h1 className="fw-bold">
              Browse Headlines
            </h1>

          </div>

          <div className="row g-4">

            {loading ? (

              <div className="text-center mt-5">
                <h4 className="fw-bold text-secondary">
                  Loading News...
                </h4>
              </div>

            ) : newsData.length > 0 ? (

              newsData.slice(0, 8).map((article, index) => (

                <div className="col-lg-3" key={index}>

                  <div
                    className="border rounded-4 p-3 h-100 shadow-sm news-card"
                    style={{
                      cursor: "pointer",
                      transition: "0.3s"
                    }}
                  >

                    <img
                      src={
                        article.image ||
                        "https://via.placeholder.com/400x250?text=News"
                      }
                      alt="news"
                      className="img-fluid rounded-4 mb-3"
                      style={{
                        height: "180px",
                        width: "100%",
                        objectFit: "cover"
                      }}
                    />

                    <div className="d-flex align-items-center mb-2">

                      <div className="bg-light rounded-4 p-2 me-2">
                        <i className="fa-regular fa-newspaper"></i>
                      </div>

                      <h6 className="mb-0 fw-bold">
                        {article.source?.name || "News"}
                      </h6>

                    </div>

                    <p
                      className="fw-semibold"
                      style={{
                        fontSize: "15px",
                        minHeight: "70px"
                      }}
                    >
                      {article.title}
                    </p>

                    <p
                      className="text-secondary"
                      style={{
                        fontSize: "13px"
                      }}
                    >
                      {article.description
                        ? article.description.slice(0, 80)
                        : "No description available"}...
                    </p>

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-dark w-100 rounded-4 mt-2"
                    >
                      Read Full News
                    </a>

                  </div>

                </div>

              ))

            ) : (

              <div className="text-center mt-5">
                <h4 className="fw-bold text-danger">
                  Failed To Load News
                </h4>
              </div>

            )}

          </div>

        </div>

      </div>

      <style>
        {`

          .news-card:hover {

            transform: translateY(-8px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.12);

          }

          .newspaper-item:hover {

            background-color: #f8f9fa;
            transform: translateX(5px);

          }

        `}
      </style>

    </div>

  );
}

export default ExploreSection;