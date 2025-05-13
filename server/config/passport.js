const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/userModel");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

const createStrategy = (Strategy, config, provider) => {
  passport.use(
    new Strategy(config, async (_, __, profile, done) => {
      let user = await User.findOne({ oauthID: profile.id });
      if (!user) {
        user = await User.create({
          name: profile.displayName,
          oauthID: profile.id,
          provider,
        });
      }
      done(null, user);
    })
  );
};

createStrategy(
  GoogleStrategy.Strategy,
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  "google"
);
