const { Router } = require("express");
const router = Router();
const commentController = require("../controllers/commentController");
const { isLoggedIn } = require("../utils");

router.get("/:id", commentController.get);
router.post("/create", isLoggedIn, commentController.create);
router.put("/:id", isLoggedIn, commentController.update);
router.delete("/:id", isLoggedIn, commentController.remove);

module.exports = router;
