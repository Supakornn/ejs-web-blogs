const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.homepage);
router.get("/info/:id", mainController.info);
router.get("/categories", mainController.allCategories);
router.get("/categories/:id", mainController.Category);
router.post("/search", mainController.search);
router.get("/latest", mainController.latest);
router.get("/random", mainController.random);
router.get("/submit", mainController.submit);
router.post("/submit", mainController.submitPost);

module.exports = router;
