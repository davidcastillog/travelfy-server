const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 10),
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
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 8 characters long"],
      maxlength: [32, "Password must be at most 32 characters long"],
      validate: {
        validator: function (password) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,32}/.test(
            password
          );
        },
      },
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
      default:
        "https://res.cloudinary.com/davidcastillog/image/upload/v1646252517/travelfy/suitecasedefault_zdvu6r.png",
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
