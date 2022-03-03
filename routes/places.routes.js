const router = require("express").Router();
const {
  createPlaceProcess,
  allPlacesProcess,
  onePlaceProcess,
  deletePlaceProcess,
} = require("../controllers/places.controller");

// Create one place
router.post("/create", createPlaceProcess);

// List all places
router.get("/", allPlacesProcess);

// Get one place
router.get("/:id", onePlaceProcess);

// Delete one place
router.delete("/delete/:id", deletePlaceProcess);

module.exports = router;
