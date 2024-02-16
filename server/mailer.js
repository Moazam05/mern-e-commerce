const nodemailer = require("nodemailer");
require("dotenv").config();

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// FUNCTION TO SEND EMAIL
const sendEmail = async (email, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId.bgMagenta);
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

module.exports = sendEmail;
