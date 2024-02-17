const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");
const checkRequiredFields = require("../utils/requiredFieldError");
const cloudinary = require("../cloudinary");

exports.createProduct = catchAsync(async (req, res, next) => {
  // 1) Check required fields
  const requiredFields = [
    "name",
    "description",
    "price",
    "stock",
    "category",
    "image",
  ];
  const missingFields = checkRequiredFields(req.body, requiredFields);

  if (missingFields.length > 0) {
    return next(
      new AppError(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  // 2) Image upload to Cloudinary
  const result = await cloudinary.uploader.upload(req.body.image, {
    folder: "ecommerce",
    public_id: `${req.body.name}-${Date.now()}`,
  });

  const newProduct = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    image: result.secure_url,
  });

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});
