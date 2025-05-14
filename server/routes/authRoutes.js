const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login",
  })
);

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      status: "success",
      user: req.user,
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "Not logged in",
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Logout failed" });

    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // default cookie name for express-session
      res
        .status(200)
        .json({ status: "success", message: "Logged out successfully" });
    });
  });
});

module.exports = router;
