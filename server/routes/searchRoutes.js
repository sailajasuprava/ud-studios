const express = require("express");
const {
  createSearch,
  getUserSearchHistory,
} = require("../controllers/searchController");

const router = express.Router();

router.post("/", createSearch);
router.post("/history", getUserSearchHistory);

module.exports = router;
