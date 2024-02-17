const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");
const checkRequiredFields = require("../utils/requiredFieldError");

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;
  const image = req.file;

  // 1) Check required fields
  const requiredFields = ["name", "description", "price", "stock", "category"];
  const missingFields = checkRequiredFields(req.body, requiredFields);

  if (missingFields.length > 0) {
    return next(
      new AppError(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    stock,
    category,
    image: image?.path,
  });

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});
