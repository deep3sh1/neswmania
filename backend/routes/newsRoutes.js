const express = require("express");
const axios = require("axios");

const router = express.Router();

let cachedNews = [];
let lastFetchTime = 0;

router.get("/", async (req, res) => {

  try {

    const now = Date.now();

    // CACHE FOR 10 MINUTES
    if (
      cachedNews.length > 0 &&
      now - lastFetchTime < 10 * 60 * 1000
    ) {

      return res.json(cachedNews);

    }

    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?lang=en&country=in&max=20&apikey=${process.env.GNEWS_API}`
    );

    cachedNews = response.data.articles;
    lastFetchTime = now;

    res.json(cachedNews);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message:
        error.response?.data?.errors?.[0] ||
        error.message
    });

  }

});

module.exports = router;