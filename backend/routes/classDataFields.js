const router = require("express").Router({ mergeParams: true });
const { appendModelData } = require("emfrest");
const { Controller } = require("emfrest");
const { protect } = require("../middleware/auth");
const ClassData = require("../models/ClassData");

const ClassDataController = new Controller();

router
  .route("/")
  .get(
    appendModelData(ClassData, "classDataField"),
    protect,
    ClassDataController.getAll
  )
  .post(
    appendModelData(ClassData, "classDataField"),
    protect,
    ClassDataController.createResource
  );

router
  .route("/:classDataFieldId")
  .get(
    appendModelData(ClassData, "classDataField"),
    protect,
    ClassDataController.getOneById
  )
  .put(
    appendModelData(ClassData, "classDataField"),
    protect,
    ClassDataController.updateOneById
  )
  .delete(
    appendModelData(ClassData, "classDataField"),
    protect,
    ClassDataController.deleteOneById
  );

module.exports = router;
