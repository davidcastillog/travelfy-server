const router = require("express").Router();
const {
  createTripProcess,
  allTripsProcess,
  oneTripProcess,
  deleteTripProcess,
} = require("../controllers/trips.controller");

// Create one trip
router.post("/create", createTripProcess);

// List all trips
router.get("/", allTripsProcess);

// Get one trip
router.get("/:id",oneTripProcess);

// Delete one trip
router.delete("/delete/:id", deleteTripProcess );

module.exports = router;
