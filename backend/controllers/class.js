const {
  getAllService,
  successfulResponse,
  ErrorResponse,
  asyncMiddlewareHandler,
  createResourceService,
  getOneByIdService,
  updateOneByIdService,
} = require("emfrest");
const Class = require("../models/Class");
const {
  getClassById,
  getStudentFieldResponses,
  getStudentClassById,
} = require("../services/class");

exports.getAllClassesTeacher = asyncMiddlewareHandler(
  async (req, res, next) => {
    const userId = req.user.id;

    const classes = await getAllService(Class, { teachers: userId });

    if (!classes) {
      return next(new ErrorResponse("Failed to retrieve classes", 404));
    }

    successfulResponse(
      res,
      200,
      "The classes were successfully found",
      classes
    );
  }
);

exports.getAllClassesStudent = asyncMiddlewareHandler(
  async (req, res, next) => {
    const userId = req.user.id;

    const classes = await getAllService(Class, { students: userId });

    if (!classes) {
      return next(new ErrorResponse("Failed to retrieve classes", 404));
    }

    successfulResponse(
      res,
      200,
      "The classes were successfully found",
      classes
    );
  }
);

exports.createClass = asyncMiddlewareHandler(async (req, res, next) => {
  const userId = req.user.id;
  req.body.teachers = [userId];

  const _class = await createResourceService(Class, req.body);

  if (!_class) {
    return next(new ErrorResponse("Failed to create class", 400));
  }

  successfulResponse(res, 200, "The class was successfully found", _class);
});

exports.getClassById = asyncMiddlewareHandler(async (req, res, next) => {
  const userId = req.user.id;
  const classId = req.params.classId;

  if (!classId || classId === "null" || classId === "undefined") {
    return next(new ErrorResponse("Add a class id", 400));
  }

  const _class = await getClassById(classId);

  if (!_class) {
    return next(new ErrorResponse("Failed to fetch class", 404));
  }

  if (
    _class.teachers.find((user) => user.id === userId) === undefined &&
    _class.students.find((user) => user.id === userId) === undefined
  ) {
    return next(new ErrorResponse("Not allowed to view class", 403));
  }

  successfulResponse(res, 200, "The class was successfully found", _class);
});

exports.getStudentClassById = asyncMiddlewareHandler(async (req, res, next) => {
  const userId = req.user.id;
  const classId = req.params.classId;

  if (!classId || classId === "null" || classId === "undefined") {
    return next(new ErrorResponse("Add a class id", 400));
  }

  const _class = await getStudentClassById(classId);
  const fieldResponses = await getStudentFieldResponses(userId, classId);

  if (!_class || !fieldResponses) {
    return next(new ErrorResponse("Failed to fetch class", 404));
  }

  if (
    _class.teachers.find((user) => user.id === userId) === undefined &&
    _class.students.find((user) => user.id === userId) === undefined
  ) {
    return next(new ErrorResponse("Not allowed to view class", 403));
  }

  successfulResponse(res, 200, "The class was successfully found", {
    ..._class,
    dataFieldResponses: fieldResponses,
  });
});

exports.addStudentToClass = asyncMiddlewareHandler(async (req, res, next) => {
  const studentId = req.user.id;
  const classId = req.params.classId;

  if (!classId || classId === "null" || classId === "undefined") {
    return next(new ErrorResponse("Add a class id", 400));
  }

  const _class = await getOneByIdService(Class, classId);

  if (!_class) {
    return next(new ErrorResponse("Failed to fetch class", 404));
  }

  if (!_class.students.includes(studentId)) {
    const updatedStudents = [..._class.students, studentId];

    const updatedClass = await updateOneByIdService(Class, classId, {
      students: updatedStudents,
    });

    if (!updatedClass) {
      return next(new ErrorResponse("Failed to update class", 404));
    }
  }

  successfulResponse(
    res,
    200,
    "The student was added to the class successfully."
  );
});
