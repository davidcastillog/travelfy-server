const router = require("express").Router();
const { uploadProcess } = require("../controllers/upload.controller");
const uploadCloud = require("../helpers/cloudinary");

router.post("/upload", uploadCloud.single("images"), uploadProcess);

module.exports = router;
