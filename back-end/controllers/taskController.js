const Task = require("../models/taskModel");
const Report = require("../models/reportModel");
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

//modify task
// modify task
const modifyTask = async (req, res) => {
  const { id } = req.params;
  const { nom, datePub, DateComp, description, project, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { nom, datePub, DateComp, description, project, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// create new task
const createTask = async (req, res) => {
  const { nom, datePub, DateComp, description, project, status, rapport_id } =
    req.body;

  try {
    const task = await Task.create({
      nom,
      datePub,
      DateComp,
      description,
      project,
      status,
    });
    if (task) {
      console.log("task created successfully");
    }
    try {
      // Update the report document and add the task
      const report = await Report.findById(rapport_id);
      if (!report) {
        console.log(`No report found with this is  :${rapport_id}`);
        return;
      }
      await Report.findByIdAndUpdate(rapport_id, {
        $push: { tasks: task._id },
      });
    } catch (error) {
      console.log("error in updating report", error);
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, modifyTask};
