const controllers = require("../controllers/home");
const verifyData = require("../middleware/verifyData");
const findUser = require("../middleware/findUser");
const express = require("express");
const router = express.Router();

router.get("/", verifyData, findUser, controllers.home);

module.exports = router;