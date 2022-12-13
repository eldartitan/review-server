const {Router} = require("express");
const passport = require("passport");
const router = Router();

router.get("/", passport.authenticate("google", {scope: ["email", "profile"]}));
router.get("/callback", passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/google/failure",
}));
router.get("/failure", (req, res) => {
    res.redirect('/protected') // Successful auth
});

module.exports = router;