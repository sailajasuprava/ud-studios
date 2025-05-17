const express = require("express");
const passport = require("passport");
const { logOut, getCurrentUser } = require("../controllers/authController");

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: true }, (err, user, info) => {
    if (err || !user) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }
    req.session.save(() => {
      res.redirect(`${process.env.CLIENT_URL}/`);
    });
  })(req, res, next);
});

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: `${process.env.CLIENT_URL}/`,
//     failureRedirect: `${process.env.CLIENT_URL}/login`,
//     session: true,
//   })
// );

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: `${process.env.CLIENT_URL}/`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

router.get("/me", getCurrentUser);
router.get("/logout", logOut);

module.exports = router;
