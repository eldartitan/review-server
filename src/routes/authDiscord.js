const { Router } = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");
const router = Router();
require("dotenv").config();
const CLIENT_URL = process.env.CLIENT_URL;

router.get("/", passport.authenticate("discord"));
router.get(
  "/callback",
  passport.authenticate("discord", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/failure",
  })
);
router.get("/failure", (req, res) => {
  res.status(400).send("Fail authenticate with discord");
});
router.get("/success", (req, res) => {
  console.log(req.user, "Discord use");
  if (req.user) res.send(req.user);
  else res.send(401);
});
router.get("/logout", authController.logout);

module.exports = router;
