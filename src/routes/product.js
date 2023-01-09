const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController");
const { isLoggedIn } = require("../utils");

router.post("/rating", isLoggedIn, productController.ratingProducts);
router.get("/:id", productController.getProduct);
router.get("/", productController.getProducts);

module.exports = router;
