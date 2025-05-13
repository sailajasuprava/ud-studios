const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user Id is required"],
    },
    oauthID: {
      type: String,
      required: [true, "oauthID is required."],
    },
    provider: {
      type: String,
      required: [true, "provider is required."],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
