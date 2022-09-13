const asyncHandler = require("../middleware/async");
const Class = require("../models/Class");
const ClassDataResponse = require("../models/ClassDataResponse");

exports.getClassById = asyncHandler(async (id) => {
  return await Class.findById(id).populate([
    "teachers",
    "students",
    "dataFields",
    "dataFieldResponses",
  ]);
});

exports.getStudentClassById = asyncHandler(async (id) => {
  return await Class.findById(id).populate(["teachers", "dataFields"]);
});

exports.getStudentFieldResponses = asyncHandler(async (userId, classId) => {
  return await ClassDataResponse.find({ userId, classId });
});
