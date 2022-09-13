const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for your classroom."],
    },
    description: {
      type: String,
      default: "",
    },
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ClassSchema.virtual("dataFields", {
  ref: "ClassData",
  localField: "_id",
  foreignField: "classId",
  justOne: false,
});

ClassSchema.virtual("dataFieldResponses", {
  ref: "ClassDataResponse",
  localField: "_id",
  foreignField: "classId",
  justOne: false,
});

module.exports = mongoose.model("Class", ClassSchema);
