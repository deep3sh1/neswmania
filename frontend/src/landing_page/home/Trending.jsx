import React, { useEffect, useState } from "react";
import axios from "axios";

const NEWSPAPERS = [
  "All Sources",
  "The Hindu",
  "Times of India",
  "Indian Express",
  "Hindustan Times",
  "Lokmat",
  "Sakal",
  "Dainik Bhaskar",
  "Economic Times"
];

const FALLBACK_NEWS = [
  {
    title: "Global Leaders Reach New Accords on Renewable Energy Infrastructure",
    description: "International delegations outline ambitious targets for expanding solar, wind, and smart electric grid networks globally by 2030.",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    source: { name: "The Hindu" },
    url: "https://www.thehindu.com"
  },
  {
    title: "Breakthrough in AI Chip Architecture Promises 5x Efficiency Leap",
    description: "Semiconductor engineers reveal novel silicon designs that drastically slash power consumption for machine learning data centers.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    source: { name: "Times of India" },
    url: "https://timesofindia.indiatimes.com"
  },
  {
    title: "Global Financial Markets Rally on Positive Manufacturing & Inflation Data",
    description: "Stock indices across Asian, European, and American markets saw strong momentum following optimistic quarterly earnings and trade numbers.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
    source: { name: "Economic Times" },
    url: "https://economictimes.indiatimes.com"
  },
  {
    title: "Next-Generation Space Telescope Sends First High-Resolution Deep Space Imagery",
    description: "Astronomers worldwide celebrate breathtaking new views of distant star clusters and exoplanet atmospheric spectra.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    source: { name: "Indian Express" },
    url: "https://indianexpress.com"
  },
  {
    title: "Major Metro High-Speed Rail Project Enters Final Testing Phase",
    description: "High-speed electric rail transit network completes initial safety simulations and prepare for rapid commercial public launch.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80",
    source: { name: "Hindustan Times" },
    url: "https://www.hindustantimes.com"
  },
  {
    title: "Groundbreaking Medical Study Identifies Key Cellular Rejuvenation Pathways",
    description: "Biochemists discover mechanisms that restore cellular resilience, opening promising avenues for age-related preventive medicine.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80",
    source: { name: "The Hindu" },
    url: "https://www.thehindu.com"
  },
  {
    title: "Urban Green Rooftops and Vertical Forests Transform Metropolis Skyline",
    description: "City planners integrate sustainable bio-architecture to reduce heat islands and purify air across high-density residential hubs.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&auto=format&fit=crop&q=80",
    source: { name: "Lokmat" },
    url: "https://www.lokmat.com"
  },
  {
    title: "Championship Finals Deliver Thrilling Double-Overtime Finish",
    description: "Athletes deliver historic performances in front of sold-out crowds and tens of millions watching live broadcasts worldwide.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80",
    source: { name: "Sakal" },
    url: "https://www.esakal.com"
  }
];

function ExploreSection() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All Sources");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/news`);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setNewsData(response.data);
        } else {
          setNewsData(FALLBACK_NEWS);
        }
      } catch (error) {
        console.log("Error loading news, using curated headlines:", error);
        setNewsData(FALLBACK_NEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const activeNews = newsData.length > 0 ? newsData : FALLBACK_NEWS;

  // Filter news based on selected source
  const filteredArticles = selectedSource === "All Sources"
    ? activeNews
    : activeNews.filter((item) =>
        item.source?.name?.toLowerCase().includes(selectedSource.toLowerCase())
      );

  // If source filter yielded 0 results, show all so user still sees news
  const displayedArticles = filteredArticles.length > 0 ? filteredArticles : activeNews;

  return (
    <div className="container-fluid mt-4 mt-md-5 px-2 px-sm-3 px-md-4 px-lg-5">
      <div className="row g-4">
        {/* LEFT SIDE: NEWSPAPERS FILTER */}
        <div className="col-12 col-lg-3 col-xl-2">
          <div className="d-flex align-items-center justify-content-between mb-2 mb-lg-3">
            <h6 className="text-uppercase fw-bold text-secondary mb-0" style={{ fontSize: "12px", letterSpacing: "1px" }}>
              Newspapers
            </h6>
            <span className="badge bg-light text-secondary border d-lg-none">
              Swipe to filter
            </span>
          </div>

          {/* Mobile Horizontal Scroll / Desktop Vertical List */}
          <div className="newspaper-nav-container hide-scrollbar d-flex flex-row flex-lg-column gap-2 overflow-x-auto pb-2 pb-lg-0">
            {NEWSPAPERS.map((paper, index) => {
              const isActive = selectedSource === paper;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedSource(paper)}
                  className={`newspaper-filter-btn d-flex align-items-center text-start border rounded-4 px-3 py-2 py-lg-3 ${
                    isActive ? "active-newspaper shadow-sm" : "bg-white text-secondary"
                  }`}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <i
                    className={`fa-regular fa-newspaper me-2 ${
                      isActive ? "text-danger" : "text-muted"
                    }`}
                  ></i>
                  <span
                    className={`fs-6 fw-semibold text-truncate ${
                      isActive ? "text-dark" : "text-secondary"
                    }`}
                  >
                    {paper}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: NEWS FEED */}
        <div className="col-12 col-lg-9 col-xl-10">
          {/* SECTION HEADER */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3 mb-md-4">
            <div className="d-flex align-items-center">
              <span className="p-2 bg-danger-subtle rounded-3 me-3 text-danger">
                <i className="fa-solid fa-fire fs-4"></i>
              </span>
              <div>
                <h2 className="fw-bold fs-3 fs-md-2 mb-0">
                  Browse Headlines
                </h2>
                {selectedSource !== "All Sources" && (
                  <small className="text-danger fw-semibold">
                    Showing: {selectedSource}
                  </small>
                )}
              </div>
            </div>

            <span className="badge bg-light text-dark border px-3 py-2 rounded-pill small">
              {displayedArticles.length} Stories Available
            </span>
          </div>

          {/* NEWS GRID */}
          <div className="row g-3 g-md-4">
            {loading ? (
              <div className="text-center py-5 w-100">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="fw-semibold text-secondary mt-3">
                  Fetching latest headlines...
                </h5>
              </div>
            ) : (
              displayedArticles.slice(0, 12).map((article, index) => (
                <div className="col-12 col-sm-6 col-lg-6 col-xl-3 d-flex" key={index}>
                  <div className="news-card border rounded-4 p-3 w-100 d-flex flex-column shadow-xs bg-white">
                    {/* ARTICLE IMAGE */}
                    <div className="position-relative overflow-hidden rounded-3 mb-3" style={{ height: "180px" }}>
                      <img
                        src={
                          article.image ||
                          "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80"
                        }
                        alt={article.title || "News"}
                        className="w-100 h-100 news-thumbnail"
                        style={{ objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80";
                        }}
                      />
                      <span className="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75 text-white rounded-pill px-2 py-1 small">
                        {article.source?.name || "News"}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h6
                      className="fw-bold line-clamp-2 text-dark mb-2"
                      style={{ fontSize: "15px", lineHeight: "1.35" }}
                      title={article.title}
                    >
                      {article.title}
                    </h6>

                    {/* DESCRIPTION */}
                    <p
                      className="text-secondary line-clamp-3 mb-3 small"
                      style={{ lineHeight: "1.45" }}
                    >
                      {article.description ||
                        "Click below to read the comprehensive news report and continuous live updates on this story."}
                    </p>

                    {/* BUTTON AT BOTTOM */}
                    <a
                      href={article.url || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-dark w-100 rounded-3 mt-auto btn-touch fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      Read Full News
                      <i className="fa-solid fa-arrow-up-right-from-square ms-2 small"></i>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .newspaper-filter-btn {
          background-color: #ffffff;
        }

        .newspaper-filter-btn:hover {
          background-color: #f8f9fa !important;
          transform: translateY(-1px);
        }

        .active-newspaper {
          background-color: #fef2f2 !important;
          border-color: #fca5a5 !important;
        }

        .news-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .news-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.12) !important;
          border-color: #cbd5e1 !important;
        }

        .news-thumbnail {
          transition: transform 0.3s ease;
        }

        .news-card:hover .news-thumbnail {
          transform: scale(1.04);
        }

        @media (max-width: 991px) {
          .newspaper-nav-container {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }
          .newspaper-filter-btn {
            scroll-snap-align: start;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default ExploreSection;