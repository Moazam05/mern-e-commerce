const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// AUTH ROUTES
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

// PROTECTED ROUTES
router.use(authController.protect);

// USER ROUTES
router.put("/updateMe", userController.updateMe);
router.put("/updateMyPassword", authController.updatePassword);

module.exports = router;
