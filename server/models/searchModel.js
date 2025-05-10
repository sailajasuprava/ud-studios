const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "user Id is required"],
    },
    term: {
      type: String,
      required: [true, "term is required."],
      minlength: [3, "Content must be at least 3 characters long."],
    },
  },
  {
    timestamps: true,
  }
);

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
