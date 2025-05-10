const axios = require("axios");
// const Search = require("../models/searchModel");

const createSearch = async (req, res, next) => {
  try {
    // const { term } = req.body;
    // const { _id } = req.user;

    // const newSearch = await Search.create({
    //   userId: _id,
    //   term,
    // });

    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=office&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
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
