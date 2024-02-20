// Custom imports
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const checkRequiredFields = require("../utils/requiredFieldError");
const { reduceStock, invalidateCache } = require("../utils");
const Order = require("../models/orderModel");
const myCache = require("../utils/cache");

exports.newOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    user,
    subtotal,
    shippingCharges,
    discount,
    total,
    status,
    orderItems,
  } = req.body;

  // 1) Check if all required fields are present
  const requiredFields = [
    "shippingInfo",
    "user",
    "subtotal",
    "shippingCharges",
    "discount",
    "total",
    "orderItems",
  ];
  const missingFields = checkRequiredFields(req.body, requiredFields);
  if (missingFields.length > 0) {
    return next(
      new AppError(`Missing fields: ${missingFields.join(", ")}`, 400)
    );
  }

  // 2) Create new order
  const newOrder = await Order.create({
    shippingInfo,
    user,
    subtotal,
    shippingCharges,
    discount,
    total,
    status,
    orderItems,
  });

  // 3) Reduce stock
  await reduceStock(orderItems);

  // 4) Invalidate cache
  await invalidateCache({ product: true, order: true, admin: true });

  // 5) Send Response
  res.status(201).json({
    status: "success",
    data: newOrder,
  });
});

// TODO: Revalidate cache on update, delete, or create, or place new order
exports.myOrders = catchAsync(async (req, res, next) => {
  let orders;

  const key = `myOrders-${req.user._id}`;

  if (myCache && myCache.get(key)) {
    orders = JSON.parse(myCache.get(key));
  } else {
    orders = await Order.find({ user: req.user._id });
    myCache && myCache.set(key, JSON.stringify(orders));
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: orders,
  });
});

exports.allOrders = catchAsync(async (req, res, next) => {
  let orders;

  if (myCache && myCache.get("allOrders")) {
    orders = JSON.parse(myCache.get("allOrders"));
  } else {
    orders = await Order.find().populate("user", "name");
    myCache && myCache.set("allOrders", JSON.stringify(orders));
  }

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: orders,
  });
});
