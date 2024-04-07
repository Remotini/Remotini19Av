const express = require("express");

const router = express.Router();
const {
  createTask,
  getTasks,
  modifyTask,
  getAllTasks,
  deleteTask,
} = require("../controllers/taskController");

//get task by id of the project
router.get("/:id", getTasks);
//get all tasks
router.get("/", getAllTasks);

//create task
router.post("/", createTask);

//update task
router.put("/:id", modifyTask);

//delete task
router.delete("/:id", deleteTask);

module.exports = router;
