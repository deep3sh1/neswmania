import React, { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_TOP_STORIES = [
  { title: "Global Climate Summit reaches landmark agreement on clean energy transitions" },
  { title: "Tech giants unveil breakthrough generative AI models with real-time reasoning" },
  { title: "Stock markets hit record highs amid robust global tech and manufacturing earnings" },
  { title: "Space exploration team successfully launches next-generation lunar satellite" },
  { title: "Electric vehicle sales surge past milestone figures across major international markets" },
  { title: "Healthcare researchers announce major advancement in targeted antibody therapies" },
  { title: "Global sports championship sets new digital viewership and attendance records" }
];

function Topstory() {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/news`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTopNews(response.data);
        } else {
          setTopNews(DEFAULT_TOP_STORIES);
        }
      } catch (error) {
        console.log("Error fetching top news, using fallback:", error);
        setTopNews(DEFAULT_TOP_STORIES);
      }
    };

    fetchTopNews();
  }, []);

  const storiesToDisplay = topNews.length > 0 ? topNews : DEFAULT_TOP_STORIES;
  // Duplicate for seamless infinite marquee scroll
  const marqueeItems = [...storiesToDisplay, ...storiesToDisplay];

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="container-fluid mt-3 mt-md-4 overflow-hidden px-2 px-sm-3 px-md-4 px-lg-5">
      {/* HEADER SECTION */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-2">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="live-dot"></span>
            <span className="text-danger fw-bold text-uppercase" style={{ fontSize: "12px", letterSpacing: "1px" }}>
              TODAY'S HIGHLIGHTS
            </span>
          </div>
          <h1 className="fw-bold fs-2 fs-md-1 mb-0" style={{ letterSpacing: "-0.5px" }}>
            Top Stories
          </h1>
        </div>

        <div className="text-secondary fw-semibold small bg-light px-3 py-1 rounded-pill border">
          <i className="fa-regular fa-calendar me-2 text-danger"></i>
          {todayFormatted}
        </div>
      </div>

      {/* LIVE HEADLINES SLIDER */}
      <div className="headline-wrapper mt-3 rounded-4 border shadow-xs">
        <div className="headline-fade-left"></div>
        <div className="headline-fade-right"></div>

        <div className="headline-track">
          {marqueeItems.slice(0, 20).map((article, index) => (
            <div key={index} className="headline-item">
              <span className="headline-badge">
                <i className="fa-solid fa-bolt me-1"></i>
                LIVE
              </span>
              <span className="headline-text">
                {article.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COMPONENT CSS */}
      <style>{`
        .live-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: #e63946;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7);
          animation: pulseDot 1.5s infinite;
        }

        @keyframes pulseDot {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(230, 57, 70, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(230, 57, 70, 0);
          }
        }

        .headline-wrapper {
          width: 100%;
          overflow: hidden;
          background: #ffffff;
          padding: 14px 0;
          position: relative;
        }

        .headline-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to right, white, transparent);
          z-index: 2;
          pointer-events: none;
        }

        .headline-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 40px;
          background: linear-gradient(to left, white, transparent);
          z-index: 2;
          pointer-events: none;
        }

        .headline-track {
          display: flex;
          width: max-content;
          animation: scrollNews 35s linear infinite;
        }

        .headline-wrapper:hover .headline-track {
          animation-play-state: paused;
        }

        .headline-item {
          display: flex;
          align-items: center;
          margin-right: 36px;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .headline-item:hover {
          transform: translateY(-1px);
        }

        .headline-badge {
          background: #e63946;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          margin-right: 10px;
          letter-spacing: 0.5px;
        }

        .headline-text {
          font-weight: 600;
          font-size: 14px;
          color: #222;
        }

        .headline-text:hover {
          color: #e63946;
        }

        @media (max-width: 576px) {
          .headline-wrapper {
            padding: 10px 0;
          }
          .headline-item {
            margin-right: 24px;
          }
          .headline-text {
            font-size: 13px;
          }
        }

        @keyframes scrollNews {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default Topstory;