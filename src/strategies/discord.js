const passport = require("passport");
const Role = require("../database/schemas/Role");
const User = require("../database/schemas/User");
const DiscordStrategy = require('passport-discord').Strategy;
require("dotenv").config();

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

passport.use(
    new DiscordStrategy(
        {
            clientID: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET,
            callbackURL: `${CALLBACK_URL}/auth/discord/callback`,
            scope: ['identify', 'email', 'guilds', 'guilds.join']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("discord strategy");
                console.log(profile);
                const userRole = await Role.findOne({ value: "User" });
                let userDb = await User.findOne({discordId: profile.id})
                if (!userDb) {
                    userDb = await User.create(
                        {
                            discordId: profile.id,
                            username: profile.username,
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
