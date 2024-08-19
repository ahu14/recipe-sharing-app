const controllers = require("../controllers/sign_up");
const express = require("express");
const router = express.Router();

router.get("/sign-up", controllers.sign_up);
router.post("/sign-up", controllers.post_sign_up)

module.exports = router;