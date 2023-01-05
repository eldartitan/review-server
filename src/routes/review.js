const { Router } = require("express");
const router = Router();
const reviewController = require("../controllers/reviewController");
const { isLoggedIn, isLoggedInSafe } = require("../utils");

router.get("/", reviewController.get);
router.post("/create", isLoggedIn, reviewController.create);
router.put("/:id", isLoggedIn, reviewController.update);
router.delete("/:id", isLoggedIn, reviewController.remove);
router.post("/like", isLoggedIn, reviewController.addLike);
router.post("/dislike", isLoggedIn, reviewController.removeLike);

module.exports = router;
