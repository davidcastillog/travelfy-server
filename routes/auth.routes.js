const router = require("express").Router();
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  getUserLogged,
  changePasswordProcess,
  updateUserProcess,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.post("/changepassword", verifyToken, changePasswordProcess);

router.post("/update",verifyToken, updateUserProcess);

router.get("/getuser", verifyToken, getUserLogged);

module.exports = router;
