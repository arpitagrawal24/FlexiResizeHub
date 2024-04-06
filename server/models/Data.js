// Data.js
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
