const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");
const checkRequiredFields = require("../utils/requiredFieldError");
const { rm } = require("fs");

exports.getLatestProducts = catchAsync(async (req, res, next) => {
  const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(5);

  res.status(200).json({
    status: "success",
    data: latestProducts,
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Product.find().distinct("category");

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError("Product not found", 404));

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.allSearchProducts = catchAsync(async (req, res, next) => {
  const { search, sort, category, price } = req.query;

  // Pagination
  const page = req.query.page * 1 || 1;
  // product per page env variable
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit;

  let baseQuery = {};

  if (search) {
    baseQuery.name = { $regex: search, $options: "i" };
  }

  if (price) {
    baseQuery.price = { $lte: price * 1 };
  }

  if (category) {
    baseQuery.category = category;
  }

  const products = await Product.find(baseQuery)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

// TODO: ADMIN ONLY
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;
  const image = req.file;

  if (!image) return next(new AppError("Image is required", 400));

  // 1) Check required fields
  const requiredFields = ["name", "description", "price", "stock", "category"];
  const missingFields = checkRequiredFields(req.body, requiredFields);

  if (missingFields.length > 0) {
    rm(image.path, (err) => {
      console.log("Deleted image file after missing fields error");
      if (err) console.log(err);
    });
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
    image: image.path,
  });

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock, category } = req.body;
  const image = req.file;

  if (!image) return next(new AppError("Image is required", 400));

  // 1) Check required fields
  const requiredFields = ["name", "description", "price", "stock", "category"];
  const missingFields = checkRequiredFields(req.body, requiredFields);

  if (missingFields.length > 0) {
    rm(image.path, (err) => {
      console.log("Deleted image file after missing fields error");
      if (err) console.log(err);
    });
    return next(
      new AppError(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    rm(image.path, (err) => {
      console.log(`Deleted image file after missing fields error`.bgRed);
      if (err) console.log(err);
    });
    return next(new AppError("Product not found", 404));
  }

  rm(product.image, (err) => {
    console.log(`Deleted old image file`.bgRed);
    if (err) console.log(err);
  });

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
      category,
      image: image.path,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new AppError("Product not found", 404));

  rm(product.image, (err) => {
    console.log(`Deleted image file`.bgRed);
    if (err) console.log(err);
  });

  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
