const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const { onlyAdmin } = require("../middleware/auth");

const router = express.Router();

// PROTECTED ROUTES
router.use(authController.protect);

router.post("/new", orderController.newOrder);
router.get("/my-orders", orderController.myOrders);
router
  .get("/:id", orderController.getOrder)
  .patch("/:id", orderController.updateOrder);

// TODO: ADMIN
router.get("/", onlyAdmin, orderController.allOrders);

// PUBLIC ROUTES

module.exports = router;
