const router = require("express").Router();
const {
  createTripProcess,
  getAllTripsProcess,
  getOneTripProcess,
  updateTripProcess,
  deleteTripProcess,
} = require("../controllers/trips.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

// Create one trip
router.post("/create", verifyToken, createTripProcess);

// List all trips
router.get("/", verifyToken, getAllTripsProcess);

// Get one trip
router.get("/:id", verifyToken, getOneTripProcess);

// Update one trip
router.patch("/update/:id", verifyToken, updateTripProcess);

// Delete one trip
router.delete("/delete/:id", verifyToken, deleteTripProcess);

module.exports = router;
