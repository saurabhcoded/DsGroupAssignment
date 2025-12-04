var v1Router = require("express").Router();
const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter");
const dashboardRouter = require("./dashboardRouter");
const tasksRouter = require("./tasksRouter");

v1Router.use("/auth", authRouter);
v1Router.use("/users", usersRouter);
v1Router.use("/dashboard", dashboardRouter);
v1Router.use("/tasks", tasksRouter);

module.exports = v1Router;
