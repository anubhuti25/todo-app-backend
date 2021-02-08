const express = require("express");
const Router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/check-auth");

Router.post("/register", UserController.createUser);
Router.post("/login", UserController.userLogin);
Router.get("/auth", checkAuth, UserController.checkUserLoggedIn);

module.exports = Router;