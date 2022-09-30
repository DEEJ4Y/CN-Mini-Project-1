const router = require("express").Router({ mergeParams: true });
const { appendModelData } = require("emfrest");
const { Controller } = require("emfrest");
const { protect } = require("../middleware/auth");
const ClassDataResponse = require("../models/ClassDataResponse");

const ClassDataResponseController = new Controller();

router
  .route("/")
  .get(
    appendModelData(ClassDataResponse, "classDataFieldResponse"),
    protect,
    ClassDataResponseController.getAll
  )
  .post(
    appendModelData(ClassDataResponse, "classDataFieldResponse"),
    protect,
    ClassDataResponseController.createResource
  );

router
  .route("/:classDataFieldResponseId")
  .get(
    appendModelData(ClassDataResponse, "classDataFieldResponse"),
    protect,
    ClassDataResponseController.getOneById
  )
  .put(
    appendModelData(ClassDataResponse, "classDataFieldResponse"),
    protect,
    ClassDataResponseController.updateOneById
  )
  .delete(
    appendModelData(ClassDataResponse, "classDataFieldResponse"),
    protect,
    ClassDataResponseController.deleteOneById
  );

module.exports = router;
