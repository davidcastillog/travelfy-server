const Places = require("../models/Places.model");
const User = require("../models/User.model");
const Trips = require("../models/Trips.model");

// Create one place
exports.createPlaceProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const place = { ...req.body };
    const newPlace = await Places.create({ ...place, _user });
    const trip = await Trips.findByIdAndUpdate(newPlace._trip, {
      $push: { _places: newPlace._id },
    });
    trip.save();
    const user = await User.findByIdAndUpdate(_user, {
      $push: { _places: newPlace._id },
    });
    user.save();
    res.status(200).json({ place: newPlace });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get all places from the user logged in
exports.allPlacesProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const places = await Places.find({ _user });
    if (places) {
      res.status(200).json({ places });
    } else {
      res.status(404).json({ errorMessage: "No places found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get one place from the user logged in
exports.onePlaceProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const place = await Places.findOne({ _id: id, _user });
    if (place) {
      res.status(200).json({ place });
    } else {
      res.status(404).json({ errorMessage: "Place not found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Update one place from the user logged in
exports.updatePlaceProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const place = await Places.findOneAndUpdate(
      { _id: id, _user },
      { ...req.body },
      { new: true }
    );
    if (place) {
      res.status(200).json({ place });
    } else {
      res.status(404).json({ errorMessage: "Place not found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Delete one place from the user logged in
exports.deletePlaceProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const place = await Places.findOneAndDelete({ _id: id, _user });
    if (place) {
      res.status(200).json({ placeDeleted: place });
    } else {
      res.status(404).json({ errorMessage: "Place not found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};
