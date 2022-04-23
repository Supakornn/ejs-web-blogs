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

// Random Controller
exports.random = async (req, res) => {
  try {
    const count = await Info.find().countDocuments();
    const random = Math.floor(Math.random() * count);
    const items = await Info.aggregate([{ $sample: { size: 5 } }]);
    res.render("random", { title: "Random", items });
  } catch (error) {
    res.status(500).send({ msg: error.message || "Error" });
  }
};

// Submit Controller
exports.submit = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("submit", { title: "Submit", infoErrorsObj, infoSubmitObj });
};

exports.submitPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).lenght === 0) {
      console.log("No Files uploaded");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath = require("path").resolve("./") + "/public/uploads/" + newImageName;
      imageUploadFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
    }

    const info = new Info({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      category: req.body.category,
      image: newImageName
    });

    await info.save();

    req.flash("infoSubmit", "Recipe has been added.");
    res.redirect("/submit");
  } catch (error) {
    // res.json(error);
    req.flash("infoErrors", error);
    res.redirect("/submit");
  }
};
