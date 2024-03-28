const express = require("express");

const router = express.Router();
const {
  createReport,
  getReports,
  deleteReport,
  updateReport,
  getTasksForReport,
} = require("../controllers/rapportController");
// Get all reports
router.get("/", getReports);

//get tasks by id of the project
router.get("/:id", getTasksForReport);

// Create a report
router.post("/", createReport);

//Delete a report
router.delete("/:id", deleteReport);

// // Modify a report
router.patch("/:id", updateReport);

// Export the router
module.exports = router;
