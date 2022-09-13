const mongoose = require("mongoose");

const ClassDataSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Please add a class id"],
    },
    key: {
      type: String,
      required: [true, "Please add a field name"],
    },
    valueType: {
      type: String,
      enum: ["Number", "Text", "Number List", "Text List"],
      required: [true, "Please add a value type"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("ClassData", ClassDataSchema);
