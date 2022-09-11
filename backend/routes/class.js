const router = require("express").Router({ mergeParams: true });
const { appendModelData } = require("emfrest");
const {
  getAllClassesTeacher,
  createClass,
  getClassById,
} = require("../controllers/class");
const { protect } = require("../middleware/auth");
const Class = require("../models/Class");

router.route("/").post(appendModelData(Class, "class"), protect, createClass);

router
  .route("/teacher")
  .get(appendModelData(Class, "class"), protect, getAllClassesTeacher);

router
  .route("/:classId")
  .get(appendModelData(Class, "class"), protect, getClassById);

module.exports = router;
