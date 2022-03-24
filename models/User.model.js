const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: [4, "Username must be at least 4 characters long"],
      maxlength: [20, "Username must be at most 20 characters long"],
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers",
      ],
      default: () => Math.random().toString(36).substring(4, 10),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email
          );
        },
        erroMessage: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    firstName: {
      type: String,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [20, "First name must be at most 20 characters"],
    },
    lastName: {
      type: String,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [20, "Last name must be at most 20 characters"],
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/davidcastillog/image/upload/v1647985995/kdfpzmtdx1kcbpcjb9sh.jpg",
    },
    googleId: {
      type: String,
      unique: true,
    },
    _places: [
      {
        type: Schema.Types.ObjectId,
        ref: "Places",
      },
    ],
    _trips: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trips",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
