const controllers = require("../controllers/logout");
const express = require("express");
const router = express.Router();

router.get("/logout", controllers.logout);

module.exports = router;