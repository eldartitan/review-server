const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const authGoogleRoute = require("./routes/authGoogle");
const authDiscordRoute = require("./routes/authDiscord");
const reviewRoute = require("./routes/review");
const commentRoute = require("./routes/comment");
const otherRoute = require("./routes/other");
const adminRoute = require("./routes/admin");
const productRoute = require("./routes/product");

require("./database");
require("./strategies/google");
require("./strategies/discord");
require("./strategies/local");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL;
const mongoUrl = process.env.MONGO_URL;
const secret = process.env.SECRET;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({ mongoUrl, collectionName: "sessions" }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(`Fail authenticate with google ${req.user}`);
});

app.use("/auth", authRoute);
app.use("/auth/google", authGoogleRoute);
app.use("/auth/discord", authDiscordRoute);
app.use("/api/user", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/comments", commentRoute);
app.use("/api/other", otherRoute);
app.use("/api/admin", adminRoute);
app.use("/api/products", productRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
