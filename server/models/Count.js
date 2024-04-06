// models/Count.js
const mongoose = require("mongoose");

const countSchema = new mongoose.Schema({
  addOperation: {
    type: Number,
    required: true,
    default: 0,
  },
  updateOperation: {
    type: Number,
    required: true,
    default: 0,
  },
  timeStamps: {
    type: Date,
    default: Date.now,
  },
});

const Count = mongoose.model("Count", countSchema);

module.exports = Count;
