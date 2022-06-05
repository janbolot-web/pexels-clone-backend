const Router = require("express");
const authController = require("../controllers/authController");
const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.get("/getUserById/:id", authController.getUserById);

module.exports = router;
