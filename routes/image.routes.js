const Router = require("express");
const imageController = require("../controllers/imageController");
const router = Router();

router.post("/add/:id", imageController.addImage);
router.get("/", imageController.getImage);
router.get("/:id", imageController.getImageById);

module.exports = router;
