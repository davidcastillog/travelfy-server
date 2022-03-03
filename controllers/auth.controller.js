const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const saltRounds = 10;
const { createJWT, clearRes } = require("../middleware/jwt.middleware");

exports.signupProcess = (req, res, next) => {
  const { email, password, confirmPassword, ...rest } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "Oye por favor manda un correo" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Oye tu contraseña debe tener mas de 8 caracteres!!! >:|",
    });
  }

  if (password != confirmPassword) {
    return res
      .status(400)
      .json({ errorMessage: "Oye tus contraseñas no coinciden " });
  }

  User.findOne({ email }).then((found) => {
    if (found) {
      return res
        .status(400)
        .json({ errorMessage: "Oye tu corre ya esta en uso" });
    }

    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        return User.create({
          email,
          password: hashedPassword,
        });
      })
      .then((user) => {

        const [header, payload, signature] = createJWT(user);

        res.cookie("headload", `${header}.${payload}`, {
          maxAge: 1000 * 60 * 30,
          httpOnly: true,
          sameSite: true,
          secure: false,
        });

        res.cookie("signature", signature, {
          httpOnly: true,
          sameSite: true,
          secure: false,
        });

        const newUser = clearRes(user.toObject());
        res.status(201).json({ user: newUser });
      })
      .catch((error) => {
        console.log(error);
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
      });
  });
};

exports.loginProcess = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "Oye tus credenciales son erroneas " });
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (match) {
      const [header, payload, signature] = createJWT(user);

      res.cookie("headload", `${header}.${payload}`, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        sameSite: true,
        secure: false,
      });

      res.cookie("signature", signature, {
        httpOnly: true,
        sameSite: true,
        secure: false,
      });
      const newUser = clearRes(user.toObject());
      res.status(200).json({ user: newUser });
    } else {
      res
        .status(400)
        .json({ errorMessage: "Oye tus credenciales son erroneas " });
    }
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ errorMessage: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        errorMessage: "mensaje de error",
      });
    }
    return res.status(500).json({ errorMessage: error.message });
  }
};

exports.logoutProcess = (req, res, next) => {
  res.clearCookie("headload");
  res.clearCookie("signature");
  res.status(200).json({ result: "Saliste todo chido!!!!!! regresa pronto!" });
};

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
