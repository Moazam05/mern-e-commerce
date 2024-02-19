const Product = require("../models/productModel");

const invalidateCache = async ({ product, order, admin }) => {
  if (product) {
    const productKeys = ["latestProducts", "categories", "products"];

    const products = await Product.find().select("_id");

    products.forEach((product) => {
      productKeys.push(`product-${product._id}`);
    });

    myCache.del(productKeys);
  }

  if (order) {
  }

  if (admin) {
  }
};

exports.invalidateCache = invalidateCache;
