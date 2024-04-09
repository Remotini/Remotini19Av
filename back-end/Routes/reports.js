const express = require("express");
const router = express.Router();
const {
  createReport,
  getReports,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");

// CRUD CONVENTION

router.post("/", createReport);
router.get("/", getReports);
router.put("/:id", updateReport);
router.delete("/:id", deleteReport);

// Export the router
module.exports = router;
