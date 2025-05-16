const express = require("express");
const {
  createSearch,
  getUserSearchHistory,
  getTopSearches,
} = require("../controllers/searchController");

const router = express.Router();

router.post("/", createSearch);
router.get("/history", getUserSearchHistory);
router.get("/top-searches", getTopSearches);

module.exports = router;
