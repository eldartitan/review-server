const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  review_id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  text: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("comments", CommentSchema);
