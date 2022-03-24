const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const { createJWT, clearRes } = require("../utils/jwt");

// Signup process

exports.signupProcess = async (req, res, next) => {
  const { email, password, confirmPassword, ...rest } = req.body;

  if (!email) {
    return res.status(400).json({ errorMessage: "Email is required" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      errorMessage: "Password must be at least 6 characters long",
    });
  }

  if (password != confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "Your passwords doesn't match" });
  }

  try {
    const found = await User.findOne({ email });
    if (found) {
      return res
        .status(400)
        .json({ errorMessage: "Your email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const [header, payload, signature] = createJWT(user);

    res.cookie("headload", `${header}.${payload}`, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.cookie("signature", signature, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    const newUser = clearRes(user.toObject());
    res.status(201).json({ user: newUser });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage:
          "Username needs to be unique. The username you chose is already in use.",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Login Process

exports.loginProcess = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "Your credentials are wrong" });
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (match) {
      const [header, payload, signature] = createJWT(user);

      res.cookie("headload", `${header}.${payload}`, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.cookie("signature", signature, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      const newUser = clearRes(user.toObject());
      res.status(200).json({ user: newUser });
    } else {
      res.status(400).json({ errorMessage: "Your credentials are wrong" });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage:
          "Username needs to be unique. The username you chose is already in use.",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Change password process
exports.changePasswordProcess = async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword.length < 6) {
    return res.status(400).json({
      errorMessage: "Password must be at least 6 characters long",
    });
  }

  if (newPassword != confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "Your passwords doesn't match" });
  }

  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const match = await bcrypt.compareSync(oldPassword, user.password);

    if (!match) {
      return res
        .status(400)
        .json({ errorMessage: "Your credentials are wrong" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.findByIdAndUpdate(_id, { password: hashedPassword });
    res.status(200).json({ message: "Your password has been changed" });
    // Update JWT cookie
    const [header, payload, signature] = createJWT(user);

    res.cookie("headload", `${header}.${payload}`, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.cookie("signature", signature, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    const newUser = clearRes(user.toObject());
    res.status(200).json({ user: newUser });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage:
          "Username need to be unique. The username you chose is already in use.",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Edit profile if is the user's profile and is logged in.
exports.updateUserProcess = async (req, res, next) => {
  const { email, username, ...rest } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json({ errorMessage: "User not found" });
  }
  if (user.email !== email) {
    const found = await User.findOne({ email });
    if (found) {
      return res
        .status(400)
        .json({ errorMessage: "Your email is already in use" });
    }
  }
  if (user.username !== username) {
    const found = await User.findOne({ username });
    if (found) {
      return res
        .status(400)
        .json({ errorMessage: "The username is already in use" });
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        email,
        username,
        ...rest,
      },
      { new: true }
    );
    const newUser = clearRes(updatedUser.toObject());
    res.status(200).json({ user: newUser });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage:
          "Username need to be unique. The username you chose is already in use.",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Logout Process

exports.logoutProcess = async (req, res, next) => {
  try {
    res.clearCookie("headload", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.clearCookie("signature", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ message: "You have been logged out" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// Get User Logged

exports.getUserLogged = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const newUser = clearRes(user.toObject());
    res.status(200).json({ user: newUser });
  } catch (error) {
    res.status(400).json({ erroMessage: error });
  }
};