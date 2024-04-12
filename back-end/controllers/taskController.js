const Task = require("../models/taskModel");
const Report = require("../models/reportModel");
const Project = require("../models/projectModel");

/**
 * POST /tasks - Create a new task.
 */
const createTask = async (req, res) => {
  try {
    const { name, description, project, rapportId } = req.body;

    if (!name || !description || !project || !rapportId) {
      return res.status(400).json({
        message:
          "Name, description, project, and rapportId are required fields",
      });
    }

    // Create a new task
    const newTask = new Task({ name, description, project });
    const savedTask = await newTask.save();

    // Find the rapport by ID and push the new task to their tasks array
    const rapport = await Report.findById(rapportId);
    if (!rapport) {
      return res.status(404).json({ message: "Rapport not found" });
    }
    rapport.tasks.push(savedTask._id);
    await rapport.save();
    //  Find the project by ID and push the new task to their tasks array
    const project1 = await Project.findOne({ name: project });
    if (!project1) {
      return res.status(404).json({ message: "project not found" });
    }
    project1.tasks.push(savedTask._id);
    await project1.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

/**
 * GET /tasks - Get task details by taskId.
 */
const getTaskDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await Task.findById(id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /tasks - Get all tasks by rapportId
 */
const getTasks = async (req, res) => {
  try {
    // const { rapport_id } = req.query;
    rapport_ids = Array.isArray(req.query.rapport_id.split(","))
      ? req.query.rapport_id.split(",")
      : [req.query.rapport_id]; //so i can pass either an array of id or a single id

    if (!rapport_ids) {
      return res
        .status(400)
        .json({ message: "rapportId query parameter is required" });
    }

    // const rapport = await Report.findById(rapport_id).populate("tasks");
    const rapport = await Report.find({ _id: { $in: rapport_ids } }).populate({
      path: "tasks",
      model: "Task",
    }); //to get the tasks of the rapportd by $in operator

    if (!rapport) {
      return res.status(404).json({ message: "rapport not found" });
    }
    const rapportString = JSON.stringify(rapport);
    const rapportJson = JSON.parse(rapportString);
    const allTasks = rapportJson.map((rapport) => rapport.tasks);
    res.json(allTasks.flat()); //to flaten the nested array [[],[],[]] => []
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
/**
 * PATCH /tasks - Update a task.
 */
const modifyTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "Name and description are required fields",
      });
    }

    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.name = name;
    task.description = description;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};
/**
 * DELETE /tasks/:id - Delete task by id.
 */

const deleteTask = async (req, res) => {
  try {
    console.log("ahla bel patronn");
    const { id } = req.params;
    const { rapportId } = req.query;
    console.log("id", id, "rapportId", rapportId);
    const deletedTask = await Task.findById({ _id: id });
    const rapport = await Report.findById({ _id: rapportId });
    console.log(deletedTask, rapport);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (deletedTask.status === "En cours") {
      await Task.findByIdAndDelete({ _id: id });
      const index = rapport.tasks.findIndex((task) => task.toString() === id);
      if (index !== -1) {
        rapport.tasks.splice(index, 1);
        await rapport.save();
      }
      res.json({ message: "Task deleted successfully" });
    } else {
      deletedTask.active = false;
      await deletedTask.save();
      res.json({ message: "Task marked as inactive" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
module.exports = {
  createTask,
  getTaskDetails,
  getTasks,
  modifyTask,
  deleteTask,
};
