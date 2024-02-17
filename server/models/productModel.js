const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product must have a description"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    stock: {
      type: Number,
      required: [true, "Product must have a stock"],
    },
    category: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Product must have a category"],
    },
    image: {
      type: String,
      required: [true, "Product must have an image"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
