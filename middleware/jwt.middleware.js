const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// Verify token for protected routes
exports.verifyToken = async (req, res, next) => {
  const { headload, signature } = req.cookies;
  if (!headload || !signature)
    return res.status(401).json({ errorMessage: "Token not found. Please login or sign up" });

  try {
    const decoded = jwt.verify(`${headload}.${signature}`, process.env.SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ errorMessage: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ errorMessage: error });
  }
}