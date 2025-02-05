const findRecipe = require("../middleware/findRecipe");
const controllers = require("../controllers/comment");
const verifyData = require("../middleware/verifyData");
const findUser = require("../middleware/findUser");
const express = require("express");
const router = express.Router();

router.get("/comment/:id", verifyData, findUser, findRecipe, controllers.comment);
router.post("/comment/:id", verifyData, findUser, findRecipe, controllers.post_comment);

module.exports = router;