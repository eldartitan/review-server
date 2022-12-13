const passport = require("passport");
const {hashSync} = require("bcrypt");
const Role = require("../database/schemas/Role");
const User = require("../database/schemas/User");

class authController {
    async logout(req, res) {
        req.logout();
        req.session.destroy();
        res.send("Goodbye!");
    }

    async register(req, res) {
        const {username, email, password} = req.body;
        const userRole = await Role.findOne({value: "User"});
        let user = await User.create({
            username,
            email,
            role: userRole.value,
            password: hashSync(password, 10),
        });
        await user.save().then((user) => console.log(user));
        res.send({success: true});
    }
}

module.exports = new authController();
