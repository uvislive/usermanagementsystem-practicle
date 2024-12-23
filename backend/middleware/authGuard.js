const jwt = require('jsonwebtoken');
const ApiResponse = require('../Common/ApiResponse');
const config = require('../config');

// Middleware to check if the user is authenticated and has the correct role
function authGuard(allowedRoles = []) {
  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header
    
    if (!token) {
      return res.status(401).json(ApiResponse.error('No token provided.'));
    }
    // Verify JWT token
    jwt.verify(token, config.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json(ApiResponse.error('Token is not valid.'));
      }


      // Attach user details from the token to the request object
      req.user = decoded;
      // If roles are specified, check if the user's role matches any of the allowed roles
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json(ApiResponse.error('You do not have permission to access this resource.'));
      }

      // Proceed to the next middleware or route handler
      next();
    });
  };
}

module.exports = authGuard;
