const router = require("express").Router();
const authRoutes = require("./auth.routes");
const tripsRoutes = require("./trips.routes");
const placesRoutes = require("./places.routes");
const uploadRoutes = require("./upload.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/trips", tripsRoutes);
router.use("/places", placesRoutes);
router.use("/", uploadRoutes);

module.exports = router;
