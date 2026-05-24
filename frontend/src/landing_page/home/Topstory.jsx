import React, { useEffect, useState } from "react";
import axios from "axios";

function Topstory() {

  const [topNews, setTopNews] = useState([]);

  useEffect(() => {

    const fetchTopNews = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/news`
        );

        setTopNews(response.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchTopNews();

  }, []);

  return (

    <div className="container-fluid mt-4 overflow-hidden ps-5 pe-5">

      {/* TOP HEADING */}
      <h6 className="text-danger fw-bold text-uppercase">
        Today
      </h6>

      <div className="d-flex justify-content-between align-items-center">

        <h1 className="fw-bold display-5">
          Top Stories
        </h1>


      </div>

      {/* LIVE HEADLINES SLIDER */}
      <div className="headline-wrapper mt-4 rounded-4 border shadow-sm">

        <div className="headline-track">

          {topNews.length > 0 ? (

            [...topNews, ...topNews].slice(0, 20).map((article, index) => (

              <div
                key={index}
                className="headline-item"
              >

                <span className="headline-badge">
                  LIVE
                </span>

                <span className="headline-text">
                  {article.title}
                </span>

              </div>

            ))

          ) : (

            <div className="headline-item">
              Loading Headlines...
            </div>

          )}

        </div>

      </div>

      {/* CSS */}
      <style>
        {`

          .headline-wrapper {

            width: 100%;
            overflow: hidden;
            background: white;
            padding: 18px 0;
            position: relative;

          }

          .headline-track {

            display: flex;
            width: max-content;
            animation: scrollNews 40s linear infinite;

          }

          .headline-wrapper:hover .headline-track {

            animation-play-state: paused;

          }

          .headline-item {

            display: flex;
            align-items: center;
            margin-right: 50px;
            white-space: nowrap;
            cursor: pointer;
            transition: 0.3s;

          }

          .headline-item:hover {

            transform: scale(1.03);

          }

          .headline-badge {

            background: red;
            color: white;
            padding: 6px 12px;
            border-radius: 30px;
            font-size: 12px;
            font-weight: bold;
            margin-right: 12px;

          }

          .headline-text {

            font-weight: 600;
            font-size: 15px;
            color: #222;

          }

          .headline-text:hover {

            color: red;

          }

          .see-all-btn {

            transition: 0.3s;

          }

          .see-all-btn:hover {

            transform: translateX(5px);

          }

          @keyframes scrollNews {

            0% {

              transform: translateX(0);

            }

            100% {

              transform: translateX(-50%);

            }

          }

        `}
      </style>

    </div>

  );
}

export default Topstory;