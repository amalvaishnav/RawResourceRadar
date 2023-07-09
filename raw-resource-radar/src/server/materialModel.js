const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  color: String,
  //   volumne: String,
  //   cost: Number,
  //   date: Date,
});

module.exports = mongoose.model("Resource", schema);
