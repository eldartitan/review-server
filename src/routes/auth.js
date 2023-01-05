const { Router } = require("express");
const router = Router();
const passport = require("passport");
const authController = require("../controllers/authController");
require("dotenv").config();
const CLIENT_URL = process.env.CLIENT_URL;

router.get(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  function (req, res) {
    res.send(req.user);
  }
);
router.get("/logout", authController.logout);
router.post("/register", authController.register);

module.exports = router;
