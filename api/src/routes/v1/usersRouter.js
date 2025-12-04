var usersRouter = require("express").Router();
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../../controllers/usersController");
const { authenticate, isAdmin } = require("../../middlewares/auth");

usersRouter.get("/", authenticate, isAdmin, getUsers);
usersRouter.get("/:id", authenticate, isAdmin, getUserById);
usersRouter.post("/", authenticate, isAdmin, createUser);
usersRouter.put("/:id", authenticate, isAdmin, updateUser);
usersRouter.delete("/:id", authenticate, isAdmin, deleteUser);

module.exports = usersRouter;
