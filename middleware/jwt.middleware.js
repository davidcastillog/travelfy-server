const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// Verify if the user is logged in

exports.verifyToken = (req, res, next) => {
  const { headload, signature } = req.cookies;
  if (!headload || !signature)
    return res.status(401).json({ errorMessage: "No token found" });

  jwt.verify(`${headload}.${signature}`, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ errorMessage: "Error on token" });
    }
    User.findById(decoded.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        res.status(401).json({ errorMessage: error });
      });
  });
};
