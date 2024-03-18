require("dotenv").config(); // Ensure you have dotenv installed to use environment variables

const config = {
  // Database connection (e.g., MongoDB)
  db: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/yourDatabase",
  },

  // Email configuration for nodemailer
  emailConfig: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE || false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  },

  // Application settings
  app: {
    port: process.env.PORT || 3000,
  },
};

module.exports = config;
