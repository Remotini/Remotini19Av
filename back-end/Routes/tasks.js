const express = require("express");

const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");

//get task by id of the project
router.get("/:id", getTasks);

//create task
router.post("/", createTask);
module.exports = router;
