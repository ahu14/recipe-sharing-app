const controllers = require("../controllers/add_recipe");
const verifyData = require("../middleware/verifyData");
const findUser = require("../middleware/findUser");
const express = require("express");
const router = express.Router();

router.get("/add-recipe", verifyData, findUser, controllers.add_recipe);
router.post("/add-recipe", verifyData, findUser, controllers.post_add_recipe);

module.exports = router;