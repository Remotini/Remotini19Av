const express = require("express");

const router = express.Router();
const {
  createTask,
  getTasks,
  modifyTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", modifyTask);
router.delete("/:id", deleteTask);

module.exports = router;
