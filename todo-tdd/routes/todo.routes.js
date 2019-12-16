const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodos);

router.get("/:todoId", todoController.getTodoById);

router.put("/:todoId", todoController.updateTodo);

module.exports = router;
