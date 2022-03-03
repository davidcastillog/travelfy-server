const Trips = require("../models/Trips.model");

// Create one trip
exports.createTripProcess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const trip = { ...req.body };
    trip.userId = userId;
    // Create trip
    const newTrip = await Trips.create(trip);
    // Send response
    res.status(200).json({ newTrip });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get all trips
exports.allTripsProcess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const trips = await Trips.find({ userId });
    res.status(200).json({ trips });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Get one trip
exports.oneTripProcess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const trip = await Trips.findOne({ _id: id, user: userId });
    res.status(200).json({ trip });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};

// Delete one trip
exports.deleteTripProcess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = await Trips.findByIdAndDelete(id);
    res.status(200).json({ trip });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
};
