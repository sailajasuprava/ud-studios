const axios = require("axios");
const Search = require("../models/searchModel");

const createSearch = async (req, res, next) => {
  try {
    const { term, userId } = req.body;

    await Search.create({
      userId,
      term,
    });

    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    console.log(response.data);

    res.status(201).json({
      status: "success",
      message: "Search created successfully",
      data: response.data.results,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSearch,
};
