const express = require("express");
// Custom Imports
const paymentController = require("../controllers/paymentController");
const { onlyAdmin } = require("../middleware/auth");

const router = express.Router();

// Payment ROUTES
router.get("/discount", paymentController.getDiscount);

router.use(onlyAdmin);

// ADMIN ONLY
router.post("/new", paymentController.newCoupon);
router.get("/all", paymentController.getAllCoupons);
router.delete("/delete/:id", paymentController.deleteCoupon);

module.exports = router;
