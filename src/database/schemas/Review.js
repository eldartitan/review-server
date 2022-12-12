const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    product_id: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    text: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    user_rating: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.String,
    },
    images: [{
        type: mongoose.SchemaTypes.String,
    }],
    likes: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    dislikes: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    tag_id: {
        type: mongoose.SchemaTypes.String,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
});

module.exports = mongoose.model("reviews", ReviewSchema);
