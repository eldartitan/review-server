const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  value: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  lang: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("categories", CategorySchema);
