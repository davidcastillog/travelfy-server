const router = require("express").Router();
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  getUserLogged,
  googleProcess,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/jwt.middleware");

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.get("/getuser", verifyToken, getUserLogged);

router.post('/google', googleProcess);

module.exports = router;
