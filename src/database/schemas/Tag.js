const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  value: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  reviews: [
    {
      type: mongoose.SchemaTypes.String,
    },
  ],
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("tags", TagSchema);
