const {Router} = require("express");
const router = Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.post("/login", passport.authenticate("local", {successRedirect: "/protected"}));
router.post("/logout", authController.logout);
router.post("/register", authController.register);

module.exports = router;