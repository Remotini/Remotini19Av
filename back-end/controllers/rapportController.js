const Report = require("../models/reportModel");
const mongoose = require("mongoose");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

//get Reports for User

const getReportsForUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({_id:id}).populate("reports");
    if (!user) {
      return res.status(404).send("No user with that id");
      
    }
    res.status(200).json({ userReports: user.reports});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//get tasks by id of the project
const getTasksForReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findById({ _id: id }).populate("tasks");
    if (!report) {
      res.status(404).send("No report with that id");
    }
    res.status(200).json({ tasks: report.tasks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all reports

const getReports = async (req, res) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.status(200).json({ reports });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//create new report
const createReport = async (req, res) => {
  const { nom, description, tasks } = req.body;
  // const report = new Report(req.body);
  // await report.save();
  try {
    const report = await Report.create({ nom, description, tasks });
    res.status(200).json({ report });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//create new report for user
const createReportForUser = async (req, res) => {
  const { id } = req.params;
  const { nom, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with that id");
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).send("No user with that id");
    }
    const report = await Report.create({ nom, description });
    user.reports.push(report._id);
    await user.save();
    res.status(200).json({ report });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete report
const deleteReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No report with that id");
  const report = await Report.findByIdAndDelete({ _id: id });

  if (!report) return res.status(400).send("No report with that id");
  res.status(200).send("Report deleted successfully");
};

//update report
const updateReport = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No report with that id");
  const report = await Report.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!report) return res.status(400).send("No report with that id");
  res.status(200).json({ report });
};

module.exports = {
  createReport,
  getReports,
  deleteReport,
  updateReport,
  getTasksForReport,
  getReportsForUser,
  createReportForUser,
};
