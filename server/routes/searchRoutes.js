const express = require("express");
const { createSearch } = require("../controllers/searchController");

const router = express.Router();

router.post("/", createSearch);

module.exports = router;
