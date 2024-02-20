const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

// PROTECTED ROUTES
router.use(authController.protect);

router.post("/new", orderController.newOrder);

// PUBLIC ROUTES

module.exports = router;
