const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  console.log("✅ Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("✅ Deserializing user:", id);
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthID: profile.id });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            oauthID: profile.id,
            provider: "google",
          });
          console.log("profile", profile);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
