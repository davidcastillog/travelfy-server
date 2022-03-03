const router = require("express").Router();
const {
  createTripProcess,
  allTripsProcess,
  oneTripProcess,
  deleteTripProcess,
} = require("../controllers/trips.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

// Create one trip
router.post("/create", verifyToken, createTripProcess);

// List all trips
router.get("/", verifyToken, allTripsProcess);

// Get one trip
router.get("/:id", verifyToken, oneTripProcess);

// Delete one trip
router.delete("/delete/:id", verifyToken, deleteTripProcess);

module.exports = router;
