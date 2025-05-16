const axios = require("axios");
const Search = require("../models/searchModel");

const createSearch = async (req, res, next) => {
  try {
    const { term, userId } = req.body;

    const newTerm = await Search.create({
      userId,
      term,
    });

    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    res.status(201).json({
      status: "success",
      message: "Search created successfully",
      data: response.data.results,
      newTerm,
    });
  } catch (err) {
    next(err);
  }
};

const getUserSearchHistory = async (req, res, next) => {
  try {
    const userId = req.user.oauthID;

    const history = await Search.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};

const getTopSearches = async (req, res, next) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: "$term",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      status: "success",
      data: topSearches,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSearch,
  getUserSearchHistory,
  getTopSearches,
};
