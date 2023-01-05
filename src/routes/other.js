const { Router } = require("express");
const router = Router();
const otherController = require("../controllers/otherController");

router.get("/tags", otherController.getTags);
router.get("/categories", otherController.getCategories);

module.exports = router;
