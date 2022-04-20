require("../models/db");
const Category = require("../models/Category");

exports.homepage = async (req, res) => {
  try {
    const limitnum = 5;
    const categories = await Category.find({}).limit(limitnum);
    res.render("index", { title: "Home", categories });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

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
