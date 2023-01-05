const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const { isLoggedInSafe } = require("../utils");

router.get("/", userController.get);
router.put("/:id", isLoggedInSafe, userController.update);
router.delete("/:id", isLoggedInSafe, userController.remove);

module.exports = router;
