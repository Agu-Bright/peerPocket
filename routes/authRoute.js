const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} = require("../controller/authController");

const { authenticatedUser } = require("../middleware/auth");

// routes for authentication => /api/v1/
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(authenticatedUser, getUserDetails);

module.exports = router;
