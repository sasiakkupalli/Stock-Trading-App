const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "mysecretkey");

    // Store user details
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};