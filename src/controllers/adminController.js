const Role = require("../database/schemas/Role");
const User = require("../database/schemas/User");
const Tag = require("../database/schemas/Tag");
const Category = require("../database/schemas/Category");
const { hashSync } = require("bcrypt");

class AdminController {
  async createAdmin(req, res) {
    const { username, email, password } = req.body;
    const userRole = await Role.findOne({ value: "Admin" });
    let user = new User({
      username,
      email,
      password: hashSync(password, 10),
      role: userRole.value,
    });
    await user.save().then((user) => console.log(user));
    res.send({ success: true });
  }

  async createAdminFromUser(req, res) {
    const { id } = req.body;
    const userRole = await Role.findOne({ value: "Admin" });
    let user = await User.updateOne({ id }, { role: userRole.value });
    console.log(user);
    res.send({ success: true });
  }

  async deleteAdmin(req, res) {
    const { id } = req.query;
    const userRole = await Role.findOne({ value: "User" });
    let user = await User.updateOne({ id }, { role: userRole.value });
    console.log(user);
    res.send({ success: true });
  }

  async createRole(req, res) {
    let role = new Role({ value: req.body.value });
    await role.save().then((role) => console.log(role));
    res.send({ success: true });
  }

  async createCategory(req, res) {
    const { value, lang } = req.body;
    let category = new Category({ value, lang });
    await category.save().then((category) => console.log(category));
    res.send({ success: true });
  }

  async createTag(req, res) {
    let tag = new Tag({ name: req.body.value });
    await tag.save().then((tag) => console.log(tag));
    res.send({ success: true });
  }
}

module.exports = new AdminController();
