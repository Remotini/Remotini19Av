const Task = require("../models/taskModel");

//get all tasks by id of the project

const getTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.find({ _id: id });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create new task
const createTask = async (req, res) => {
  const { nom, datePub, DateComp, status } = req.body;
  try {
    const task = await Task.create({ nom, datePub, DateComp, status });
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask };
