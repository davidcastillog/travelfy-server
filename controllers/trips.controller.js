const Trips = require("../models/Trips.model");
const User = require("../models/User.model");
const Places = require("../models/Places.model");

// Create one trip
exports.createTripProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const trip = { ...req.body };
    const newTrip = await Trips.create({ ...trip, _user });
    const user = await User.findByIdAndUpdate(_user, {
      $push: { _trips: newTrip._id },
    });
    user.save();
    res.status(200).json({ trip: newTrip });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get all trips from the user logged in
exports.getAllTripsProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const trips = await Trips.find({ _user });
    if (trips) {
      res.status(200).json({ trips });
    } else {
      res.status(404).json({ errorMessage: "No trips found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get one trip from the user logged in
exports.getOneTripProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const trip = await Trips.findOne({ _id: id, _user });
    if (trip) {
      res.status(200).json({ trip });
    } else {
      res.status(404).json({ errorMessage: "Trip not found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get all places from one of the user's trip
exports.getAllPlacesFromTripProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const places = await Places.find({ _trip: id, _user });
    if (places) {
      res.status(200).json({ places });
    } else {
      res.status(404).json({ errorMessage: "No places found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get all places from a trip to share with other users
exports.getAllPlacesToShareProcess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const places = await Places.find({ _trip: id });
    if (places) {
      res.status(200).json({ places });
    } else {
      res.status(404).json({ errorMessage: "No places found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Update one trip from the user logged in
exports.updateTripProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const trip = await Trips.findOneAndUpdate({ _id: id, _user }, req.body);
    if (trip) {
      res.status(200).json({ trip });
    } else {
      res.status(404).json({ errorMessage: "Trip not found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Delete one trip from the user logged in
exports.deleteTripProcess = async (req, res, next) => {
  try {
    const { _id: _user } = req.user;
    const { id } = req.params;
    const trip = await Trips.findOneAndDelete({ _id: id, _user });
    const user = await User.findByIdAndUpdate(_user, { $pull: { _trips: id } });
    user.save();
    const places = await Places.find({ _trip: id });
    if (places) {
      places.forEach(async (place) => {
        await Places.findByIdAndDelete(place._id);
        const user = await User.findByIdAndUpdate(_user, {
          $pull: { _places: place._id },
        });
        user.save();
      });
    } else {
      res.status(404).json({ errorMessage: "Places not found" });
    }
    if (trip) {
      res.status(200).json({ tripDeleted: trip });
    } else {
      res.status(404).json({ errorMessage: "Trip not found" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};
