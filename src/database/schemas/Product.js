const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  value: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  rating: { type: mongoose.SchemaTypes.Array },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("products", ProductSchema);
