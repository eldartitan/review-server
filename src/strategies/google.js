const passport = require("passport");
const Role = require("../database/schemas/Role");
const User = require("../database/schemas/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${CALLBACK_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile, "google strategy");
        const userRole = await Role.findOne({ value: "User" });
        let userDb = await User.findOne({ googleId: profile.id });
        if (!userDb) {
          userDb = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.email,
            role: userRole.value,
          });
        }
        return cb(null, userDb);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log(user, "serializeUser");
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  console.log(user, "deserializeUser");
  User.findById(user._id, (err, user) => {
    if (err) {
      cb(null, false, { error: err });
    } else {
      cb(null, user);
    }
  });
});
