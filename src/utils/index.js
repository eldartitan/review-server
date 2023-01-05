const Role = require("../database/schemas/Role");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

async function isLoggedInSafe(req, res, next) {
  console.log("isLoggedInSave");
  console.log(req.body.log_id);
  const userRole = await Role.findOne({ value: "Admin" });
  req.user.role === userRole || req.user._id === req.body.log_id
    ? next()
    : res.sendStatus(401);
}

async function isAdmin(req, res, next) {
  console.log("isAdmin");
  const userRole = await Role.findOne({ value: "Admin" });
  req.user.role === userRole ? next() : res.sendStatus(401);
}

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

module.exports = { isLoggedIn, isLoggedInSafe, average };
