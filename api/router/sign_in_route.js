const controllers = require("../controllers/sign_in");
const express = require("express");
const router = express.Router();

router.get("/sign-in", controllers.sign_in);
router.post("/sign-in", controllers.post_sign_in);

module.exports = router;