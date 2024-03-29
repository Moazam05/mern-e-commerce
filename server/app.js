require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const NodeCache = require("node-cache");
// Custom Imports
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
};

// Cache
module.exports.myCache = new NodeCache();

const app = express();
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  express.json({
    limit: "3mb",
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// PRODUCTION SETUP
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.send("Production Mode: Ecommerce API is running...");
  });
} else {
  app.get("/", (req, res) => {
    res.send("Ecommerce API is running...");
  });
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
