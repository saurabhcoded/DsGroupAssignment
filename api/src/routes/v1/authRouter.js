var authRouter = require("express").Router();
const { register, login, logout, getProfile } = require("../../controllers/authController");
const { authenticate } = require("../../middlewares/auth");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/profile", authenticate, getProfile);

module.exports = authRouter;
