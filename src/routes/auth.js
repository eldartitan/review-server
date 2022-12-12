const {Router} = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const router = Router();

router.get("/google", passport.authenticate("google", {scope: ["email", "profile"]}));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/google/failure",
}));
router.get("/google/failure", authController.googleFailure);
router.post("/login", passport.authenticate("local", {successRedirect: "/protected"}));
router.post("/logout", authController.logout);
router.post("/register", authController.register);

module.exports = router;