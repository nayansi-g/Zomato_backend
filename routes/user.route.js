const { SignUp, LogIn } = require("../controllers/User.controller");

const router = require("express").Router();

router.post("/signup",  SignUp)
router.post("/login", LogIn)



module.exports = router