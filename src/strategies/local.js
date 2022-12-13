const { compareSync } = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const User = require('../database/schemas/User')

passport.use(new LocalStrategy(
    (username, password, done) => {
        console.log("login")
        User.findOne({ username }, function (err, user) {
            if (err) { return done(err); } //When some error occurs
            if (!user) {  //When username is invalid
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!compareSync(password, user.password)) { //When password is invalid 
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log(user)
             //When user is valid
             return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log("serialize")
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserialize")
    await User.findById(id, (err, user) => {
        done(err, user);
    });
});