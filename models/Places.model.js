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
        required: [true, "Description is required"],
        minlength: [2, "Description must be at least 2 characters"],
        maxlength: [20, "Description must be at most 20 characters"],
    },
    placeImages: [
        {
            type: String,
            default: "",
        },
    ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    // !! Review if this is the best way to do this
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
            required: true,
        },
    },
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Places = model("Places", placesSchema);

module.exports = Places;
