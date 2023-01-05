const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController");

router.post("/rating", productController.ratingProducts);
router.get("/:id", productController.getProduct);
router.get("/", productController.getProducts);

module.exports = router;
