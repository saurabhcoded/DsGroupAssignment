var dashboardRouter = require("express").Router();
const { getDashboard } = require("../../controllers/dashboardController");
const { authenticate } = require("../../middlewares/auth");

dashboardRouter.get("/", authenticate, getDashboard);

module.exports = dashboardRouter;
