require("../models/db");
const Category = require("../models/Category");
const Info = require("../models/Info");

// Home Controller
exports.homepage = async (req, res) => {
  try {
    const limitnum = 5;
    const categories = await Category.find({}).limit(limitnum);
    const latest = await Info.find({}).sort({ _id: -1 }).limit(limitnum);
    const info = { latest };
    res.render("index", { title: "Home", categories, info });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Category Controller
exports.allCategories = async (req, res) => {
  try {
    // const limitnum = 20;
    // const categories = await Category.find({}).limit(limitnum);
    const categories = await Category.find({});
    res.render("categories", { title: "Home", categories });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};
