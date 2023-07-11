const mongoose = require("mongoose");

//Model for the data for RRR app
const schema = mongoose.Schema({
  name: String,
  color: String,
  vol: Number,
  cost: Number,
});

module.exports = mongoose.model("Resource", schema);
