const express = require("express");

const router = express.Router();
const { createTask, getTasks, modifyTask, getAllTasks } = require("../controllers/taskController");

//get task by id of the project
router.get("/:id", getTasks);
//get all tasks
router.get("/", getAllTasks);

//create task
router.post("/", createTask);

//update task
router.put("/:id", modifyTask);
module.exports = router;
