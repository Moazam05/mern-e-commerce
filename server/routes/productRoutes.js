const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const { onlyAdmin } = require("../middleware/auth");

const router = express.Router();

// PROTECTED ROUTES
router.use(authController.protect);
router.use(onlyAdmin);

// create product
router.post("/", productController.createProduct);
// router.get("/", productController.getAllProducts);
// router
//   .get("/:id", productController.getProduct)
//   .put("/:id", productController.updateProduct)
//   .delete("/:id", productController.deleteProduct);

module.exports = router;
