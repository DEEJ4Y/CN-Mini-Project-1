const router = require("express").Router({ mergeParams: true });
const { appendModelData } = require("emfrest");
const {
  getAllClassesTeacher,
  createClass,
  getClassById,
  addStudentToClass,
  getAllClassesStudent,
  getStudentClassById,
} = require("../controllers/class");
const { protect } = require("../middleware/auth");
const Class = require("../models/Class");

router.route("/").post(appendModelData(Class, "class"), protect, createClass);

router
  .route("/teacher")
  .get(appendModelData(Class, "class"), protect, getAllClassesTeacher);

router
  .route("/student")
  .get(appendModelData(Class, "class"), protect, getAllClassesStudent);

router
  .route("/:classId")
  .get(appendModelData(Class, "class"), protect, getClassById);

router
  .route("/:classId/join-student")
  .get(appendModelData(Class, "class"), protect, addStudentToClass);

router
  .route("/:classId/for-student")
  .get(appendModelData(Class, "class"), protect, getStudentClassById);

module.exports = router;
