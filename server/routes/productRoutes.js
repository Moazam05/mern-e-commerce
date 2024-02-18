const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const { onlyAdmin } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");

const router = express.Router();

// PUBLIC ROUTES

router.get("/categories", productController.getCategories);
router.get("/latest", productController.getLatestProducts);
router.get("/all", productController.allSearchProducts);
router.get("/:id", productController.getProduct);
router.get("/", productController.getAllProducts);

// PROTECTED ROUTES
router.use(authController.protect);

// create product
router.post("/", onlyAdmin, singleUpload, productController.createProduct);
router
  .patch("/:id", onlyAdmin, singleUpload, productController.updateProduct)
  .delete("/:id", onlyAdmin, productController.deleteProduct);

module.exports = router;
