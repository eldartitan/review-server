const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  product_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
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
    required: true,
  },
  likes: [{ type: mongoose.SchemaTypes.String }],
  images: [{ type: mongoose.SchemaTypes.String }],
  tags: [{ type: mongoose.SchemaTypes.String }],
  comments: [{ type: mongoose.SchemaTypes.String }],
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

ReviewSchema.index({ title: "text", text: "text" });

module.exports = mongoose.model("reviews", ReviewSchema);
