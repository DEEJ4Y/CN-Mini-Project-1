const asyncHandler = require("../middleware/async");
const Class = require("../models/Class");

exports.getClassById = asyncHandler(async (id) => {
  return await Class.findById(id).populate(["teachers", "students"]);
});
