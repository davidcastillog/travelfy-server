const router = require("express").Router();
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  getUserLogged,
  googleProcess,
  changePasswordProcess,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.post("/changepassword", changePasswordProcess);

router.get("/getuser", verifyToken, getUserLogged);

router.post("/google", googleProcess);

module.exports = router;
