const Places = require("../models/Places.model");

// Create one place
exports.createPlaceProcess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const place = { ...req.body };
    place.userId = userId;
    const newPlace = await Places.create({ place });
    res.status(200).json({ newPlace });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get all places
exports.allPlacesProcess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const places = await Places.find({ userId });
    res.status(200).json({ places });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get one place
exports.onePlaceProcess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const place = await Places.findOne({ _id: id, userId });
    res.status(200).json({ place });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Delete one place
exports.deletePlaceProcess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = await Places.findByIdAndDelete(id);
    res.status(200).json({ place });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};
