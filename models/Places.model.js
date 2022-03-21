const { Schema, model } = require("mongoose");

const placesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
    },
    address: {
      type: String,
    },
    placeImages: {
        type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    apiLocationId: {
      type: Number,
      required: true,
    },
    num_reviews: {
      type: Number,
    },
    ranking: {
      type: String,
    },
    website: {
      type: String,
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
