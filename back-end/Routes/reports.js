const express = require("express");
const router = express.Router();
const {
  createReport,
  getReports,
  deletedReport,
  updateReport,
  getTasksForReport,
  getReportsForUser,
  createReportForUser,
} = require("../controllers/rapportController");
// Get all reports
router.get("/", getReports);

//get reports by id of the user

router.get("/user/:id", getReportsForUser);

//get tasks by id of the project
router.get("/:id", getTasksForReport);

// Create a report
router.post("/", createReport);

// Create a report for user
router.post("/user/:id", createReportForUser);

//Delete a report
router.delete("/:id", deletedReport);

// // Modify a report
router.put("/:id", updateReport);

// Export the router
module.exports = router;
