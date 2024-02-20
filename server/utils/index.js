const { myCache } = require("../app");
const Product = require("../models/productModel");

// TODO: 1) Invalidate cache
const invalidateCache = async ({ product, order, admin }) => {
  if (product) {
    const productKeys = ["latestProducts", "categories", "products"];

    const products = await Product.find().select("_id");

    products.forEach((product) => {
      productKeys.push(`product-${product._id}`);
    });

    myCache && myCache.del(productKeys);
  }

  if (order) {
  }

  if (admin) {
  }
};

exports.invalidateCache = invalidateCache;

// TODO: 2) Reduce stock
const reduceStock = async (orderItems) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) continue;

    product.stock = product.stock - order.quantity;
    await product.save({ validateBeforeSave: false });
  }
};

exports.reduceStock = reduceStock;
