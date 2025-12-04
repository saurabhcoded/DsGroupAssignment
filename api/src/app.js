var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var connectDB = require("./config/db");

var indexRouter = require("./routes/index");
const rateLimitService = require("./services/rateLimitService");

connectDB();

var app = express();

app.use(cors());
app.use(rateLimitService);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", (req, res, next) => {
  if (req.path === "/") {
    return res.send("Task management system API Running 🌍");
  }
  next();
});
app.use("/api", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
