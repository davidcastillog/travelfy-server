const { Schema, model } = require("mongoose");

const placesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [20, "Name must be at most 20 characters"],
    },
    description: {
      type: String,
      minlength: [2, "Description must be at least 2 characters"],
      maxlength: [30, "Description must be at most 30 characters"],
    },
    placeImages: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    _trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Places = model("Places", placesSchema);

module.exports = Places;
