var tasksRouter = require("express").Router();
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require("../../controllers/tasksController");
const { authenticate, isAdmin } = require("../../middlewares/auth");

tasksRouter.get("/", authenticate, getTasks);
tasksRouter.get("/:id", authenticate, getTaskById);
tasksRouter.post("/", authenticate, createTask);
tasksRouter.put("/:id", authenticate, updateTask);
tasksRouter.delete("/:id", authenticate, deleteTask);

module.exports = tasksRouter;
