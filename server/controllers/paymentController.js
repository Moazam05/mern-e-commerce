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

exports.getDiscount = catchAsync(async (req, res, next) => {
  const { coupon } = req.query;

  if (!coupon) {
    return next(new AppError("Coupon is required", 400));
  }

  const discount = await Coupon.findOne({ coupon });

  if (!discount) {
    return next(new AppError("Invalid Coupon", 400));
  }

  res.status(200).json({
    status: "success",
    data: discount.amount,
  });
});

exports.getAllCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    status: "success",
    results: coupons.length,
    data: coupons,
  });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Coupon ID is required", 400));
  }

  const coupon = await Coupon.findById(id);

  if (!coupon) {
    return next(new AppError("No coupon found", 404));
  }

  await Coupon.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
