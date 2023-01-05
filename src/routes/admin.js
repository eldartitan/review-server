const { Router } = require("express");
const router = Router();
const adminController = require("../controllers/adminController")

router.post("/", adminController.createAdmin);
router.post("/from-user", adminController.createAdminFromUser);
router.post("/delete-admin", adminController.deleteAdmin);
router.post("/tag", adminController.createTag);
router.post("/role", adminController.createRole);
router.post("/category", adminController.createCategory);

module.exports = router;