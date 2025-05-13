const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "/login",
  })
);

module.exports = router;
