const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming you have a User model
const Role = require('../models/Role'); // Role model to get the role name
const config = require('../config');
const mongoose = require('mongoose');
const ApiResponse = require('../Common/ApiResponse');

// Login User and issue JWT token with role name, issuer, and audience claims
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(ApiResponse.error('User not found.'));
    }

    // Compare password with stored hash
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json(ApiResponse.error('Invalid password.'));
    }

    const userRole = await Role.findById(user.roleId);
    if (!userRole) {
      return res.status(400).json(ApiResponse.error('User role does not exist.'));
    }

    // Define the JWT payload
    const payload = {
      userId: user._id,
      email: user.email,
      role: userRole.name,  // Add role name to the payload
    };

    // Define JWT options with issuer and audience
    const options = {
      expiresIn: '1h', // Expiration time (optional)
      issuer: 'http://localhost:9001', // The entity that issued the token (e.g., your app's name or domain)
      audience: 'http://localhost:3000', // The intended recipient of the token (e.g., the user)
    };

    // Generate JWT token
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, options);

    // Return the token wrapped in ApiResponse.success
    return res.status(200).json(ApiResponse.success({ token }, 'Login successful.'));
  } catch (error) {
    return res.status(500).json(ApiResponse.error('Internal server error.'));
  }
}

module.exports = {
  login,
};
