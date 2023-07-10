const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  color: String,
  vol: Number,
  cost: Number,
  date: Date,
});

module.exports = mongoose.model("Resource", schema);
