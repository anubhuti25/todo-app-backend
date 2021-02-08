const express = require("express");
const Router = express.Router();

const TodoController = require("../controllers/todo");
const checkAuth = require('../middleware/check-auth');

Router.get("/", checkAuth, TodoController.getTodos);

Router.get("/:id", checkAuth, TodoController.getTodo);

Router.post("/", checkAuth, TodoController.createBatch, TodoController.createTodo);

Router.post("/completed/:id", checkAuth, TodoController.toggleCompleted);

Router.put("/:id", checkAuth, TodoController.createBatch, TodoController.updateTodo);

Router.delete("/:id", checkAuth, TodoController.deleteTodo);

module.exports = Router;