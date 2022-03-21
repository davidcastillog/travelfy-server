const { Schema, model } = require("mongoose");

const tripsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [20, "Title must be at most 20 characters"],
    },
    description: {
      type: String,
      minlength: [2, "Description must be at least 2 characters"],
      maxlength: [30, "Description must be at most 30 characters"],
      default: "It's time to get away!",
    },
    tripImage: {
      type: String,
      default:
        "https://res.cloudinary.com/davidcastillog/image/upload/v1647290056/travelfy/default-trip_fym57f.jpg",
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _places: [
      {
        type: Schema.Types.ObjectId,
        ref: "Places",
      },
    ],
    isPrivate : {
        type: Boolean,
        default: true
    },
  },
  {
    timestamps: true,
  }
);

const Trips = model("Trips", tripsSchema);

module.exports = Trips;
