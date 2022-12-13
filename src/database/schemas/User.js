const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    username: {type: mongoose.SchemaTypes.String, require: true},
    role: {type: String, ref: "roles"},
    password: {type: mongoose.SchemaTypes.String},
    googleId: {type: mongoose.SchemaTypes.String},
    discordId: {type: mongoose.SchemaTypes.String},
    product: [{
        rating: {
            type: mongoose.SchemaTypes.Number,
            required: true,
        },
        id: {type: mongoose.SchemaTypes.Number}
    }],
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model("users", UserSchema);