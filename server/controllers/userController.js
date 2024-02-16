// Custom imports
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const cloudinary = require("../cloudinary");

exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, email, pic, fileName } = req.body;

  // 1) Check if user exists
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError("No user found", 404));
  }

  // 2) Image upload to Cloudinary
  const result = await cloudinary.uploader.upload(pic, {
    folder: "ecommerce",
    public_id: `${req.user.name}-${fileName}-${Date.now()}`,
  });

  // 3) Update user
  const newUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      pic: result.secure_url,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  newUser.password = undefined;

  // 4) Send Response
  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
