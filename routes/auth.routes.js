const router = require("express").Router();
const {
  signupProcess,
  loginProcess,
  logoutProcess,
  getUserLogged,
} = require("../controllers/auth.controller");
//importa mi middelware
const { verifyToken } = require("../middleware/jwt.middleware");

router.post("/signup", signupProcess);

router.post("/login", loginProcess);

router.post("/logout", logoutProcess);

router.get("/getUser", verifyToken, getUserLogged);

module.exports = router;
