const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// PUBLIC ROUTES
router.post("/new", orderController.newOrder);

module.exports = router;
