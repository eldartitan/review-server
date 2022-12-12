const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(
    MONGO_URL,
    (err) => {
        if (err) console.log(err);
        else console.log("mongdb is connected");
    }
);
