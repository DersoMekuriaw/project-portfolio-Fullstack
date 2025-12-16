const express = require("express");
const router = express.Router();

const projectCtrl = require("../controllers/projectController");
const { verifyToken } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post(
  "/create",
  verifyToken,
  upload.single("screenshot"),
  projectCtrl.createProject
);

router.get("/all", projectCtrl.getAll);
router.get("/:id", projectCtrl.getById);
router.get("/developer/:developerId", projectCtrl.getByDeveloper);

module.exports = router;
