require('dotenv').config();

module.exports = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  MONGO_URI:process.env.MONGO_URI,
  PORT:process.env.PORT
};
