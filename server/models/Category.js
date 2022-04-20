const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: "This fild is require"
  },
  image: {
    type: String,
    require: "This fild is require"
  }
});

module.exports = mongoose.model("Category", categorySchema);
