require("../models/db");
const Category = require("../models/Category");
const Info = require("../models/Info");

// Home Controller
exports.homepage = async (req, res) => {
  try {
    const limitnum = 5;
    const categories = await Category.find({}).limit(limitnum);
    const latest = await Info.find({}).sort({ _id: -1 }).limit(limitnum);
    const one = await Info.find({ category: "1" }).limit(limitnum);
    const two = await Info.find({ category: "2" }).limit(limitnum);
    const three = await Info.find({ category: "3" }).limit(limitnum);
    const four = await Info.find({ category: "4" }).limit(limitnum);
    const five = await Info.find({ category: "5" }).limit(limitnum);
    const info = { latest, one, two, three, four, five };
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

exports.Category = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Info.find({ category: id });
    res.render("categories", { title: category.name, category });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Info Controller
exports.info = async (req, res) => {
  try {
    const id = req.params.id;
    const info = await Info.findById(id);
    res.render("info", { title: info.name, info });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Search Controller
exports.search = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const items = await Info.find({ $text: { $search: searchTerm } });
    res.render("search", { title: "Search", items });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Latest Controller
exports.latest = async (req, res) => {
  try {
    const limitnum = 20;
    const latest = await Info.find({}).sort({ _id: -1 }).limit(limitnum);
    res.render("latest", { title: "Latest", latest });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

exports.random = async (req, res) => {
  try {
    res.render("random", { title: "Random", random });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};
