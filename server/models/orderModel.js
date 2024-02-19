const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Order must have a shipping address"],
      },
      city: {
        type: String,
        required: [true, "Order must have a city"],
      },
      state: {
        type: String,
        required: [true, "Order must have a state"],
      },
      phone: {
        type: String,
        required: [true, "Order must have a phone number"],
      },
      postalCode: {
        type: String,
        required: [true, "Order must have a postal code"],
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    subtotal: {
      type: Number,
      required: [true, "Order must have a subtotal"],
    },
    shippingCharges: {
      type: Number,
      required: [true, "Order must have shipping charges"],
    },
    discount: {
      type: Number,
      required: [true, "Order must have a discount"],
    },
    total: {
      type: Number,
      required: [true, "Order must have a total"],
    },
    status: {
      type: String,
      enum: ["Processing", "shipped", "delivered"],
      default: "Processing",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Order must have a product name"],
        },
        photo: {
          type: String,
          required: [true, "Order must have a product photo"],
        },
        price: {
          type: Number,
          required: [true, "Order must have a product price"],
        },
        quantity: {
          type: Number,
          required: [true, "Order must have a quantity"],
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Order must have a product"],
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
