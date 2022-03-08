const router = require("express").Router();
const {
  createPlaceProcess,
  getAllPlacesProcess,
  getOnePlaceProcess,
  updatePlaceProcess,
  deletePlaceProcess,
} = require("../controllers/places.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

// Create one place
router.post("/create", verifyToken, createPlaceProcess);

// List all places
router.get("/", verifyToken, getAllPlacesProcess);

// Get one place
router.get("/:id", verifyToken, getOnePlaceProcess);

// Update one place
router.patch("/update/:id", verifyToken, updatePlaceProcess);

// Delete one place
router.delete("/delete/:id", verifyToken, deletePlaceProcess);

module.exports = router;
