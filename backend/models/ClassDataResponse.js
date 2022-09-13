const mongoose = require("mongoose");

const ClassDataResponseSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Please add a class id"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a user id"],
    },
    fieldId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassData",
      required: [true, "Please add a class data field id"],
    },
    value: {
      type: String,
      required: [true, "Please add valid data"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("ClassDataResponse", ClassDataResponseSchema);
