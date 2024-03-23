const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  coupon: {
    type: String,
    required: [true, "Coupon must have a code"],
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, "Coupon must have an amount"],
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
