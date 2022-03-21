const jwt = require("jsonwebtoken");

// Create a JWT

exports.createJWT = (user) => {
  return jwt
    .sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    )
    .split(".");
};

// Clean the JWT

exports.clearRes = (data) => {
  const { password, __v, updatedAt, ...cleanedData } = data;

  return cleanedData;
};
