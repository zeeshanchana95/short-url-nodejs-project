const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics } = require("../controllers/url");
const router = express().router();

router.post("/", handleGenerateShortURL)

router.get('/anaylytics/:shortId',   handleGetAnalytics)

module.exports = router;


