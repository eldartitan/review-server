const { hashSync } = require("bcrypt");
const Role = require("../database/schemas/Role");
const User = require("../database/schemas/User");

class authController {
  async logout(req, res, next) {
    req.logout(req.user, (err) => {
      if (err) return res.status(400).send(err.message);
      req.session = null;
      res.send("Goodbye!");
    });
  }

  async register(req, res) {
    const { username, email, password } = req.body;
    const userRole = await Role.findOne({ value: "User" });
    let user = await User.create({
      username,
      email,
      role: userRole.value,
      password: hashSync(password, 10),
    });
    await user.save().then((user) => console.log(user));
    res.send({ success: true });
  }
}

module.exports = new authController();
