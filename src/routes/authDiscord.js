const {Router} = require("express");
const passport = require("passport");
const router = Router();

router.get('/', passport.authenticate('discord'));
router.get('/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/protected') // Successful auth
});

module.exports = router;