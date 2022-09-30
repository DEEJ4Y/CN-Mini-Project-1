const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { Api } = require("emfrest");

// Security
const { protect } = require("../middleware/auth");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// Utility
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const errorHandler = require("../middleware/error");

// Models
const User = require("../models/User");
const Class = require("../models/Class");
const ClassData = require("../models/ClassData");
const ClassDataResponse = require("../models/ClassDataResponse");

// Bring in route files
const auth = require("../routes/auth");
const authClient = require("../routes/authClient");
const classRouter = require("../routes/class");
const classDataFieldRouter = require("../routes/classDataFields");
const classDataFieldResponseRouter = require("../routes/classDataFieldResponse");

module.exports = (app) => {
  // cors
  app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

  // Public files
  app.use(express.static(path.resolve("public")));
  app.use(express.static(path.resolve("views")));

  // Body parser
  app.use(express.json());

  // Cookie parser
  app.use(cookieParser());

  // Dev logging middleware
  const { nodeEnv } = require("../config/config");
  if (nodeEnv === "Development") {
    app.use(morgan("dev"));
  }

  // File uploading
  app.use(fileupload());

  // Sanitize data
  app.use(mongoSanitize());

  // Set security headers
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Prevent XSS attacks
  app.use(xss());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
  });
  app.use(limiter);

  // Prevent http param pollution
  app.use(hpp());

  // Mount routers
  app.use("/api/v1/auth", auth);
  app.use("/auth", authClient);
  app.use("/datafields", classDataFieldRouter);
  app.use("/responses", classDataFieldResponseRouter);
  Api(app, {
    model: ClassDataResponse,
    modelName: "user-response",
    routePrefix: "/response",
    preMiddleware: [protect],
  });
  app.use("/classes", classRouter);
  Api(app, {
    model: Class,
    modelName: "classe",
    preMiddleware: [protect],
  });
  Api(app, {
    model: User,
    modelName: "user",
    preMiddleware: [protect],
  });

  app.use("/", (req, res) => {
    res.status(200).json({ success: true });
  });

  // Custom error handler middleware
  app.use(errorHandler);

  return app;
};
