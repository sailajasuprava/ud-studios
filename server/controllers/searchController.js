const Search = require("../models/searchModel");

const createSearch = async (req, res, next) => {
  try {
    const { term } = req.body;
    const { _id } = req.user;

    const newSearch = await Search.create({
      userId: _id,
      term,
    });

    res.status(201).json({
      status: "success",
      message: "Search created successfully",
      data: newSearch,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createSearch,
};
