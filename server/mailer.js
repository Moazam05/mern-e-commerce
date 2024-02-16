const nodemailer = require("nodemailer");
require("dotenv").config();
const Message = require("./models/messageModel");
const User = require("./models/userModel");

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// FUNCTION TO SEND EMAIL
const sendEmail = async (
  email,
  name,
  subject,
  htmlContent,
  publicName,
  message
) => {
  try {
    if (publicName) {
      const user = await User.findOne({
        name: publicName,
      });
      if (!user) {
        return next(new AppError("User not found", 404));
      }

      // SEND EMAIL
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: subject,
        html: htmlContent,
      });

      // SAVE MESSAGE TO DB
      await Message.create({
        name,
        email,
        message,
        user: user._id,
      });
      console.log("Message sent: %s", info.messageId.bgMagenta);
    } else {
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: subject,
        html: htmlContent,
      });

      console.log("Message sent: %s", info.messageId.bgMagenta);
    }
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

module.exports = sendEmail;
