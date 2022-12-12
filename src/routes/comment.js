const {Router} = require("express");
const router = Router();
const commentController = require("../controllers/commentController");
const {isLoggedIn, isLoggedInSafe} = require("../utils/isLogged");

router.get("/", commentController.get);
router.post("/create", isLoggedIn, commentController.create);
router.put("/:id", isLoggedInSafe, commentController.update);
router.delete("/:id", isLoggedInSafe, commentController.remove);

module.exports = router;