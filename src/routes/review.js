const {Router} = require("express");
const router = Router();
const reviewController = require("../controllers/reviewController");
const {isLoggedIn, isLoggedInSafe} = require("../utils/isLogged");

router.get("/", reviewController.get);
router.post("/create", isLoggedIn, reviewController.create);
router.put("/:id", isLoggedInSafe, reviewController.update);
router.delete("/:id", isLoggedInSafe, reviewController.remove);

module.exports = router;