const passport = require("passport");
const Role = require("../database/schemas/Role");
const User = require("../database/schemas/User");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
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
            passReqToCallback: true,
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                console.log("google strategy");
                console.log(profile);
                const userRole = await Role.findOne({ value: "User" });
                let userDb = await User.findOne({googleId: profile.id})
                if (!userDb) {
                    userDb = await User.create(
                        {
                            googleId: profile.id,
                            username: profile.displayName,
                            photos: profile.picture,
                            email: profile.email,
                            role: userRole.value,
                        }
                    );
                }
                return done(null, userDb);
            } catch(err) {
                return done(err, null)
            }
        }
    )
);

passport.serializeUser(function (user, done) {
    console.log("serializeUser");
    console.log(user);
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log("deserializeUser");
    done(null, user);
});
