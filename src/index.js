const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const MongoStore = require('connect-mongo');

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const reviewRoute = require("./routes/review");
const commentRoute = require("./routes/comment");
const otherRoute = require("./routes/other");
const adminRoute = require("./routes/admin");

require("./database");
require("./strategies/googleAuth");
require("./strategies/local");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL;
const mongoUrl = process.env.MONGO_URL;
const secret = process.env.SECRET;
console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

app.use(express.json());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(
    session({
        secret,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({mongoUrl, collectionName: "sessions"}),
        cookie: {maxAge: 1000 * 60 * 60 * 24},
    })
);
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
    res.send('<a href="auth/google">Authenticate with Google</a>');
    console.log("main page");
    console.log(req.user);
});
app.get("/protected", isLoggedIn, (req, res) => {
    console.log("protected");
    console.log(req.user);
    res.send(`Hello ${req.user.username}`);
});

app.use("/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/comment", commentRoute);
app.use("/api/other", otherRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
