const jwt = require('jsonwebtoken');
const config = require('../config'); // Assuming you stored JWT_SECRET_KEY in config.js

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY); // Verify the token
    req.user = decoded; // Attach the decoded user data to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateJWT;
