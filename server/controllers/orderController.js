// Custom imports
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const checkRequiredFields = require("../utils/requiredFieldError");
const { reduceStock, invalidateCache } = require("../utils");
const Order = require("../models/orderModel");

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
