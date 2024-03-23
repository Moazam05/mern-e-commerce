const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Coupon = require("../models/couponModel");

exports.newCoupon = catchAsync(async (req, res, next) => {
  const { coupon, amount } = req.body;

  if (!coupon || !amount) {
    return next(new AppError("Coupon and amount are required", 400));
  }

  const newCoupon = await Coupon.create({
    coupon,
    amount,
  });

  res.status(201).json({
    status: "success",
    data: newCoupon,
  });
});
