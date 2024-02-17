const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const { onlyAdmin } = require("../middleware/auth");
const singleUpload = require("../middleware/multer");

const router = express.Router();

// PROTECTED ROUTES
router.use(authController.protect);
router.use(onlyAdmin);

// create product
router.post("/", singleUpload, productController.createProduct);

module.exports = router;
