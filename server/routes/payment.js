const express = require("express");
// Custom Imports
const authController = require("../controllers/authController");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

// PROTECTED ROUTES
// router.use(authController.protect);

// Payment ROUTES
router.post("/new", paymentController.newCoupon);
router.get("/discount", paymentController.getDiscount);
router.get("/all", paymentController.getAllCoupons);
router.delete("/delete/:id", paymentController.deleteCoupon);

module.exports = router;
