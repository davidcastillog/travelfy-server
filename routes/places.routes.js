const router = require("express").Router();
const {
  createPlaceProcess,
  allPlacesProcess,
  onePlaceProcess,
  updatePlaceProcess,
  deletePlaceProcess,
} = require("../controllers/places.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

// Create one place
router.post("/create", verifyToken, createPlaceProcess);

// List all places
router.get("/", verifyToken, allPlacesProcess);

// Get one place
router.get("/:id", verifyToken, onePlaceProcess);

// Update one place
router.patch("/update/:id", verifyToken, updatePlaceProcess);

// Delete one place
router.delete("/delete/:id", verifyToken, deletePlaceProcess);

module.exports = router;
