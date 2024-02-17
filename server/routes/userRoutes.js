const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { onlyAdmin } = require("../middleware/auth");

const router = express.Router();

// AUTH ROUTES
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

// ADMIN CAN MODIFY
router.get("/", onlyAdmin, userController.getAllUsers);
router
  .get("/:id", onlyAdmin, userController.getUser)
  .delete("/:id", onlyAdmin, userController.deleteUser);

// PROTECTED ROUTES
router.use(authController.protect);

// USER ROUTES
router.put("/updateMe", userController.updateMe);
router.put("/updateMyPassword", authController.updatePassword);

module.exports = router;
