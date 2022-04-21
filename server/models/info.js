const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: "This fild is require"
  },
  description: {
    type: String,
    require: "This fild is require"
  },
  emails: {
    type: String,
    require: "This fild is require"
  },
  category: {
    type: String,
    require: "This fild is require",
    enum: ["1", "2", "3", "4", "5"]
  },
  image: {
    type: String,
    require: "This fild is require"
  }
});

module.exports = mongoose.model("info", infoSchema);
