require("dotenv").config();
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");
const checkRequiredFields = require("../utils/requiredFieldError");
const { rm } = require("fs");
const { myCache } = require("../server");

// TODO: Revalidate cache on update, delete, or create, or place new order
exports.getLatestProducts = catchAsync(async (req, res, next) => {
  let latestProducts;

  if (myCache && myCache.has("latestProducts")) {
    latestProducts = JSON.parse(myCache.get("latestProducts"));
  } else {
    latestProducts = await Product.find().sort({ createdAt: -1 }).limit(5);
    (await myCache) &&
      myCache.set("latestProducts", JSON.stringify(latestProducts));
  }

  res.status(200).json({
    status: "success",
    data: latestProducts,
  });
});

// TODO: Revalidate cache
exports.getCategories = catchAsync(async (req, res, next) => {
  let categories;

  if (myCache && myCache.has("categories")) {
    categories = JSON.parse(myCache.get("categories"));
  } else {
    categories = await Product.find().distinct("category");
    myCache && myCache.set("categories", JSON.stringify(categories));
  }

  res.status(200).json({
    status: "success",
    data: categories,
  });
});

// TODO: Revalidate cache
exports.getAllProducts = catchAsync(async (req, res, next) => {
  let products;

  if (myCache && myCache.has("products")) {
    products = JSON.parse(myCache.get("products"));
  } else {
    products = await Product.find();
    myCache && myCache.set("products", JSON.stringify(products));
  }

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

// TODO: Revalidate cache
exports.getProduct = catchAsync(async (req, res, next) => {
  let product;
  const id = req.params.id;

  if (myCache && myCache.has(`product-${id}`)) {
    product = JSON.parse(myCache.get(`product-${id}`));
  } else {
    product = await Product.findById(req.params.id);
    myCache && myCache.set(`product-${id}`, JSON.stringify(product));
  }

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
  const limit = req.query.limit * 1 || process.env.PRODUCTS_PER_PAGE;
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

  const productPromise = Product.find(baseQuery)
    .sort(sort && { price: sort === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const [products, totalProducts] = await Promise.all([
    productPromise,
    Product.find(baseQuery),
  ]);

  const totalPages = Math.ceil(totalProducts.length / limit);

  res.status(200).json({
    status: "success",
    results: products.length,
    totalPages,
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
