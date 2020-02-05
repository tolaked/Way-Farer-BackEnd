const express = require("express");
const router = express.Router();

const userController = require("./userController");
// const { register } = userController

router.route("/");
router.route("/register").post(userController.register);

module.exports = router;
