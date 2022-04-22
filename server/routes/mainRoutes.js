const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.homepage);
router.get("/info/:id", mainController.info);
router.get("/categories", mainController.allCategories);
router.get("/categories/:id", mainController.Category);

module.exports = router;
